import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { Conference } from '../../api/conference';
import { ConferenceService } from '../../service/conference.service';
import { UserService } from '../../service/user.service';

export type ChangeSource = 'user' | 'auto-select-first' | 'preselect-id' | 'programmatic';
export type ExtendedConference = Conference & { __none__?: boolean }

const NONE_OPTION: ExtendedConference = {
    id: -1,
    name: '— Nincs, vagy nincs engedélyezett konferenciája —',
    __none__: true
}

@Component({
    selector: 'app-conference-selector',
    templateUrl: './conference-selector.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ConferenceSelectorComponent),
        multi: true
    }]
})
export class ConferenceSelectorComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

    // static: false ensures that the ViewChild is dynamically updated when the template changes
    @ViewChild('conferenceSelector', { static: false })
    private conferenceSelectorRef: MultiSelect

    @Input() selectionLimit?: number                // Maximum number of selectable conferences (optional)
    @Input() selectFirstOption: boolean = false     // Whether to automatically select the first available option
    @Input() placeholder: string                    // Placeholder text for the dropdown
    @Input() showClear: boolean = true              // Whether to show the clear button
    @Input() showNoneOption: boolean = true         // whether to show the "none" option
    @Input() style: { [key: string]: string } = {}  // outer style for the dropdown
    @Input() styleClass: string = ''                // extra css classes for wrapper
    @Input() panelStyle: { [key: string]: string }  // style for the overlay panel
    @Input() panelStyleClass: string = ''           // css class for the overlay panel
    @Input() disabledOptions: Conference[] = []     // List of disabled conference IDs
    @Input() emitOnSelectFirstOption = false        // only turn it on where you really need it
    @Input() emitOnPreselectId = false
    @Input() emitOnWriteValue = false

    @Input()
    set preselectIds(value: number | string | Array<number | string> | null | undefined) {
        const arr = Array.isArray(value) ? value : (value != null ? [value] : [])
        const nums = arr.map(v => typeof v === 'string' ? Number(v) : v)
            .filter((n): n is number => Number.isFinite(n))
        this._pendingSelectIds = nums.length ? nums : undefined
        this.preselectByIds()    // try to apply immediately if data already loaded
    }

    @Output() change = new EventEmitter<{ value: Conference[]; source: ChangeSource }>()

    loading: boolean = true                   // Loading state indicator
    disabled: boolean = false                 // Whether the selector is disabled
    conferences: any[] = []                   // List of available conference options
    originalConferences: any[] = []           // Original list of conference options
    selectedConferences: any[] = []           // List of currently selected conferences
    isOrganizer: boolean = false              // User has organizer role
    currentUserId: number | null = null       // Logged in user id

    private _pendingSelectIds?: number[]
    private subscriptions: Subscription = new Subscription()
    private suppress = 0
    private runSilently<T>(fn: () => T): T { this.suppress++; try { return fn() } finally { this.suppress-- } }

    constructor(private conferenceService: ConferenceService,
        private userService: UserService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) { }

    /**
     * Lifecycle hook: Called when the component is initialized.
     * Fetches the list of conferences and selects the first option if required.
     */
    ngOnInit(): void {
        // Get logged in user id from local storage
        this.currentUserId = this.userService.getLoggedInUserId() || null

        // Check if user is Organizer, then load conferences
        const roleSub = this.userService.hasRole(['Szervezo'])
            .subscribe(isOrganizer => {
                this.isOrganizer = isOrganizer
                this.loadConferences()
            })

        this.subscriptions.add(roleSub)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabledOptions'] && this.originalConferences.length > 0) {
            this.updateDisabledFlags()
        }
        if (changes['preselectIds']) {
            this.preselectByIds()
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    /**
     * Loads conferences from the backend.
     * Organizer users see only their own conferences,
     * other users see all enabled conferences.
     */
    private loadConferences(): void {
        this.loading = true

        const params: any = {
            sort: 'beginDate',
            order: 'asc',
            enabled: 1
        }

        // Global rule:
        // - If user is Organizer and we know the logged in user id,
        //   filter by organizer_user_id.
        console.log('this.isOrganizer', this.isOrganizer)
        console.log('this.currentUserId', this.currentUserId)
        if (this.isOrganizer && this.currentUserId != null) {
            params.organizer_user_id = this.currentUserId
        }

        const sub = this.conferenceService
            .getSelector$(params)
            .subscribe({
                next: conferences => {
                    const base = conferences ?? []
                    const withNone = this.showNoneOption
                        ? [NONE_OPTION, ...base]
                        : [...base]

                    this.conferences = withNone
                    this.originalConferences = [...withNone] // clone
                    this.syncSelectedConferences()
                    this.handleSelectFirstOption()
                    this.updateDisabledFlags()
                    this.preselectByIds()
                    this.loading = false
                    this.cdr.markForCheck()
                },
                error: () => {
                    this.conferences = []
                    this.originalConferences = []
                    this.loading = false
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load conferences. Please try again later.'
                    })
                    this.cdr.markForCheck()
                }
            })

        this.subscriptions.add(sub)
    }

    /**
     * Update the conferences list by assigning the disabled field to each option
     */
    updateDisabledFlags(): void {
        const disabledList = Array.isArray(this.disabledOptions) ? this.disabledOptions : []
        this.conferences = this.originalConferences.map((conference: Conference) => ({
            ...conference,
            disabled: this.isNone(conference)
                ? false
                : disabledList.some(disabledConf => disabledConf?.id === conference.id)
        }))
        this.cdr.markForCheck()
    }

    // Opcionális publikus setter programozott beállításhoz:
    public setSelection(value: Conference[], opts?: { emit?: boolean; source?: ChangeSource }) {
        const source = opts?.source ?? 'programmatic'
        this.runSilently(() => { this.selectedConferences = this.normalizeSelection(value) })
        if (opts?.emit) this.emit(this.selectedConferences, source, true)
        else this.cdr.markForCheck()
    }

    /**
     * Selects the first available conference if the `selectFirstOption` flag is enabled.
     * This ensures that the component has an initial selection when loaded.
     */
    private handleSelectFirstOption(): void {
        if (!this.selectFirstOption || this.selectedConferences.length || !this.conferences.length) return

        const firstReal = this.conferences.find(c => !this.isNone(c) && !c.disabled)
        if (!firstReal) { this.cdr.markForCheck(); return }

        this.runSilently(() => { this.selectedConferences = [firstReal] })

        // if you specifically want this to trigger filtering:
        if (this.emitOnSelectFirstOption) {
            this.emit(this.selectedConferences, 'auto-select-first', true)
        } else {
            this.cdr.markForCheck()
        }
    }

    /**
     * Applies any pending preselection once the options list is available.
     *
     * Finds the conference matching `_pendingSelectIds` in `conferences` and updates
     * `selectedConferences` accordingly (single-item array or empty). Idempotent:
     * safe to call multiple times, even with the same ID.
     *
     * Side effects:
     * - Invokes ControlValueAccessor hooks (`onChange`, `onTouched`) to sync the parent form.
     *
     * Notes:
     * - Selection is ID-based (use `dataKey="id"` on the MultiSelect), not by object reference.
     */
    private preselectByIds(): void {
        if (!this.conferences?.length || !this._pendingSelectIds?.length) return

        const idSet = new Set(this._pendingSelectIds)
        const found = this.conferences.filter(c => !this.isNone(c) && idSet.has(Number(c.id)))

        this.runSilently(() => {
            const limit = this.selectionLimit ?? found.length
            this.selectedConferences = found.slice(0, limit)
            this.conferenceSelectorRef?.writeValue(this.selectedConferences)
        })

        if (this.emitOnPreselectId) {
            this.emit(this.selectedConferences, 'preselect-id', true)
        } else {
            this.cdr.markForCheck()
        }
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     * 
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled
    }

    /**
     * Synchronizes the selected conferences with the available options.
     * Ensures that the selected values remain valid if the list of conferences updates.
     */
    private syncSelectedConferences(): void {
        const current = Array.isArray(this.selectedConferences) ? this.selectedConferences : [];
        this.selectedConferences = this.conferences.filter(conf =>
            current.some(sel => sel?.id === conf?.id)
        );
        this.onChange(this.selectedConferences)
        this.cdr.markForCheck()
    }

    /**
     * Handles the event when the selection changes.
     * Updates the selected conferences and notifies the parent component.
     * 
     * @param event - The selection change event containing the selected values.
     */
    onSelectionChange(event: any): void {
        const raw = Array.isArray(event?.value) ? event.value : []
        this.selectedConferences = this.normalizeSelection(raw)
        this.emit(this.selectedConferences, 'user')

        // Auto-close if max 1 can be selected and there is already a selection
        if (this.selectionLimit == 1 && this.selectedConferences?.length >= 1) {
            // small delay to let MultiSelect update its own state first
            setTimeout(() => this.conferenceSelectorRef?.hide())
        }
    }

    /**
     * Handles the clear selection event.
     * Resets the selected conferences and notifies the parent component.
     */
    onSelectionClear(): void {
        this.runSilently(() => {
            this.selectedConferences = []
            this.conferenceSelectorRef?.writeValue([])
        })
        // Emit so parent form & listeners see the clear as well
        this.emit(this.selectedConferences, 'user', true)
    }

    // Helpers for none
    private isNone = (c: any) => !!c?.__none__ || c?.id === -1
    private getNone = (): ExtendedConference => NONE_OPTION

    private normalizeSelection(list: Conference[]): Conference[] {
        const arr = Array.isArray(list) ? list : []
        const hasNone = arr.some(c => this.isNone(c))
        if (hasNone) return [this.getNone()]
        const limit = this.selectionLimit ?? arr.length
        return arr.slice(0, limit)
    }

    private emit(value: Conference[], source: ChangeSource, force = false) {
        // during mute we only allow it in case of force
        if (this.suppress && !force) {
            return
        }

        this.onChange(value)
        this.onTouched()
        this.change.emit({ value, source })

        // Ensure UI updates after every emission under OnPush
        this.cdr.markForCheck()
    }

    // ===========================
    // ControlValueAccessor Methods
    // ===========================

    /**
     * Writes the value from the parent form into the component.
     * Used when the form initializes or updates externally.
     * 
     * @param value - The selected conferences coming from the form.
     */
    writeValue(value: Conference[] | Conference | null | undefined): void {
        const arr: Conference[] = Array.isArray(value) ? value : (value ? [value] : [])
        this.runSilently(() => { this.selectedConferences = this.normalizeSelection(arr) })
        if (this.emitOnWriteValue) this.emit(this.selectedConferences, 'programmatic', true)
        else this.cdr.markForCheck()
    }

    /**
     * Registers a callback function that is called when the value changes.
     * This is part of the ControlValueAccessor implementation.
     * 
     * @param fn - The callback function to be triggered on value change.
     */
    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    /**
     * Registers a callback function that is called when the input is touched.
     * This is part of the ControlValueAccessor implementation.
     * 
     * @param fn - The callback function to be triggered on input touch.
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    /**
     * Callback function to handle value changes from the parent form.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onChange = (_: any) => { }

    /**
     * Callback function to handle when the input is touched.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onTouched = () => { }
}
