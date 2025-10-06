import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { Guest } from '../../api/guest';
import { GuestService } from '../../service/guest.service';
import * as moment from 'moment';
moment.locale('hu')

export type ChangeSource = 'user' | 'auto-select-first' | 'preselect-id' | 'programmatic';

export type GuestFilter = {
    conferenceId?: number | null;
    building?: string | string[];
    minBeds?: number;
    climate?: boolean;
    enabled?: boolean;
    // (optionel) startDate?: string; endDate?: string; onlyFree?: boolean;
}

@Component({
    selector: 'app-guest-selector',
    templateUrl: './guest-selector.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GuestSelectorComponent),
        multi: true
    }]
})
export class GuestSelectorComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

    // static: false ensures that the ViewChild is dynamically updated when the template changes
    @ViewChild('guestSelector', { static: false })
    private readonly guestSelectorRef: MultiSelect

    @Input() filter: GuestFilter | null = null       // All Guest filters
    @Input() selectionLimit?: number                // Maximum number of selectable guests (optional)
    @Input() selectFirstOption: boolean = false     // Whether to automatically select the first available option
    @Input() placeholder: string                    // Placeholder text for the dropdown
    @Input() showClear: boolean = true              // Whether to show the clear button
    @Input() style: { [key: string]: string } = {}  // Custom style for the dropdown
    @Input() disabledOptions: Guest[] = []           // List of disabled guest IDs
    @Input() emitOnSelectFirstOption = false        // only turn it on where you really need it
    @Input() emitOnPreselectId = false
    @Input() emitOnWriteValue = false
    @Input()
    set preselectGuestId(value: number | undefined) {
        this._pendingSelectId = value
        this.tryPreselectById()                      // Select predefined guest by Id
    }

    @Output() change = new EventEmitter<{ value: Guest[]; source: ChangeSource }>()

    loading: boolean = true                          // Loading state indicator
    disabled: boolean = false                        // Whether the selector is disabled
    guests: Guest[] = []                               // List of available guest options
    originalGuests: Guest[] = []                       // Original list of guest options
    selectedGuests: Guest[] = []                       // List of currently selected guests

    private _pendingSelectId?: number
    private subscriptions: Subscription = new Subscription()
    private suppress = 0
    private runSilently<T>(fn: () => T): T { this.suppress++; try { return fn() } finally { this.suppress-- } }

    constructor(private guestService: GuestService,
        private messageService: MessageService
    ) { }

    /**
     * Lifecycle hook: Called when the component is initialized.
     * Fetches the list of guests and selects the first option if required.
     */
    ngOnInit(): void {
        this.reload()
        setTimeout(() => {
            this.handleSelectFirstOption()
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.reload()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    private reload() {
        this.loading = true
        this.guestService.searchGuestsForSelector$(this.filter ?? {})
            .subscribe({
                next: list => {
                    this.guests = (list ?? []).map((g: Guest) => ({
                        ...g,
                        fullName: `${g.lastName ?? ''} ${g.firstName ?? ''}`.trim() // Create fullname
                    }))
                    this.loading = false
                },
                error: _ => {
                    this.guests = []
                    this.loading = false
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load guests.'
                    })
                }
            })
    }

    // Opcionális publikus setter programozott beállításhoz:
    public setSelection(value: Guest[], opts?: { emit?: boolean; source?: ChangeSource }) {
        const source = opts?.source ?? 'programmatic'
        this.runSilently(() => { this.selectedGuests = value?.slice(0, this.selectionLimit ?? value.length) ?? [] })
        if (opts?.emit) this.emit(this.selectedGuests, source, true)
    }

    /**
     * Selects the first available guest if the `selectFirstOption` flag is enabled.
     * This ensures that the component has an initial selection when loaded.
     */
    private handleSelectFirstOption(): void {
        if (this.selectFirstOption && this.selectedGuests.length === 0 && this.guests.length) {
            this.runSilently(() => {
                this.selectedGuests = this.guests.slice(0, this.selectionLimit ?? 1)
            })
            // if you specifically want this to trigger filtering:
            if (this.emitOnSelectFirstOption) this.emit(this.selectedGuests, 'auto-select-first', /*force*/ true);
        }
    }

    /**
     * Applies any pending preselection once the options list is available.
     *
     * Finds the guest matching `_pendingSelectId` in `guests` and updates
     * `selectedGuests` accordingly (single-item array or empty). Idempotent:
     * safe to call multiple times, even with the same ID.
     *
     * Side effects:
     * - Invokes ControlValueAccessor hooks (`onChange`, `onTouched`) to sync the parent form.
     *
     * Notes:
     * - Selection is ID-based (use `dataKey="id"` on the MultiSelect), not by object reference.
     */
    private tryPreselectById(): void {
        if (!this.guests?.length || this._pendingSelectId == null) return
        const c = this.guests.find(x => x.id === this._pendingSelectId)
        this.runSilently(() => { this.selectedGuests = c ? [c] : [] })
        if (this.emitOnPreselectId) this.emit(this.selectedGuests, 'preselect-id', true)
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
     * Synchronizes the selected guests with the available options.
     * Ensures that the selected values remain valid if the list of guests updates.
     */
    private syncSelectedGuests(): void {
        this.selectedGuests = this.guests.filter(conf =>
            this.selectedGuests.some(sel => sel.id === conf.id)
        )
        this.onChange(this.selectedGuests)
    }

    /**
     * Handles the event when the selection changes.
     * Updates the selected guests and notifies the parent component.
     * 
     * @param event - The selection change event containing the selected values.
     */
    onSelectionChange(event: any): void {
        this.selectedGuests = event.value
        this.emit(this.selectedGuests, 'user')

        // Auto-close if max 1 can be selected and there is already a selection
        if (this.selectionLimit == 1 && this.selectedGuests?.length >= 1) {
            // small delay to let MultiSelect update its own state first
            setTimeout(() => this.guestSelectorRef?.hide())
        }
    }

    /**
     * Handles the clear selection event.
     * Resets the selected guests and notifies the parent component.
     */
    onSelectionClear(): void {
        this.selectedGuests = []
        this.onChange(this.selectedGuests)
        this.onTouched()
    }

    private emit(value: Guest[], source: ChangeSource, force = false) {
        if (this.suppress && !force) return   // during mute we only allow it in case of force
        this.onChange(value); this.onTouched()
        this.change.emit({ value, source })
    }

    getAge(birthDate: string): string {
        if (!birthDate) return "";
        const birth = moment(birthDate)
        const today = moment()
        return today.diff(birth, 'years').toString()
    }

    // ===========================
    // ControlValueAccessor Methods
    // ===========================

    /**
     * Writes the value from the parent form into the component.
     * Used when the form initializes or updates externally.
     * 
     * @param value - The selected guests coming from the form.
     */
    writeValue(value: Guest[]): void {
        this.runSilently(() => {
            this.selectedGuests = value?.slice(0, this.selectionLimit ?? value.length) ?? []
        })
        if (this.emitOnWriteValue) this.emit(this.selectedGuests, 'programmatic', true)
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
