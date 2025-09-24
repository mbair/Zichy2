import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { Conference } from '../../api/conference';
import { ConferenceService } from '../../service/conference.service';

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
    private readonly conferenceSelectorRef: MultiSelect

    @Input() selectionLimit?: number                // Maximum number of selectable conferences (optional)
    @Input() selectFirstOption: boolean = false     // Whether to automatically select the first available option
    @Input() placeholder: string                    // Placeholder text for the dropdown
    @Input() showClear: boolean = true              // Whether to show the clear button
    @Input() style: { [key: string]: string } = {}  // Custom style for the dropdown
    @Input() disabledOptions: Conference[] = []     // List of disabled conference IDs
    @Input()
    set preselectConferenceId(value: number | undefined) {
        this._pendingSelectId = value
        this.tryPreselectById()                      // Select predefined conference by Id
    }

    loading: boolean = true                          // Loading state indicator
    disabled: boolean = false                        // Whether the selector is disabled
    conferences: Conference[] = []                   // List of available conference options
    originalConferences: Conference[] = []           // Original list of conference options
    selectedConferences: Conference[] = []           // List of currently selected conferences

    private _pendingSelectId?: number
    private subscriptions: Subscription = new Subscription()

    constructor(private conferenceService: ConferenceService,
        private messageService: MessageService
    ) { }

    /**
     * Lifecycle hook: Called when the component is initialized.
     * Fetches the list of conferences and selects the first option if required.
     */
    ngOnInit(): void {
        const sub = this.conferenceService.getConferencesForSelector()
            .subscribe({
                next: conferences => {
                    this.conferences = conferences ?? []
                    this.originalConferences = [...(conferences ?? [])]   // clone
                    this.syncSelectedConferences()
                    this.handleSelectFirstOption()
                    this.updateDisabledFlags()
                    this.tryPreselectById()
                    this.loading = false
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
                }
            })
        this.subscriptions.add(sub)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabledOptions'] && this.originalConferences.length > 0) {
            this.updateDisabledFlags()
        }
        if (changes['preselectConferenceId']) {
            this.tryPreselectById()
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    /**
     * Update the conferences list by assigning the disabled field to each option
     */
    updateDisabledFlags(): void {
        this.conferences = this.originalConferences.map((conference: Conference) => ({
            ...conference,
            disabled: this.disabledOptions.some(disabledConf => disabledConf.id === conference.id)
        }))
    }

    /**
     * Selects the first available conference if the `selectFirstOption` flag is enabled.
     * This ensures that the component has an initial selection when loaded.
     */
    private handleSelectFirstOption(): void {
        if (this.selectFirstOption && (!this.selectedConferences || this.selectedConferences.length === 0)) {
            const limit = this.selectionLimit ?? 1
            this.selectedConferences = this.conferences.slice(0, limit)
            this.onChange(this.selectedConferences) // Notify the parent component about the selection
        }
    }

    /**
     * Applies any pending preselection once the options list is available.
     *
     * Finds the conference matching `_pendingSelectId` in `conferences` and updates
     * `selectedConferences` accordingly (single-item array or empty). Idempotent:
     * safe to call multiple times, even with the same ID.
     *
     * Side effects:
     * - Invokes ControlValueAccessor hooks (`onChange`, `onTouched`) to sync the parent form.
     *
     * Notes:
     * - Selection is ID-based (use `dataKey="id"` on the MultiSelect), not by object reference.
     */
    private tryPreselectById(): void {
        if (!this.conferences?.length) return       // No conference list
        if (this._pendingSelectId == null) return   // Nothing to select

        const conference = this.conferences.find(c => c.id === this._pendingSelectId)
        this.selectedConferences = conference ? [conference] : []
        this.onChange(this.selectedConferences)   // Push back to form
        this.onTouched()
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
        this.selectedConferences = this.conferences.filter(conf =>
            this.selectedConferences.some(sel => sel.id === conf.id)
        )
        this.onChange(this.selectedConferences)
    }

    /**
     * Handles the event when the selection changes.
     * Updates the selected conferences and notifies the parent component.
     * 
     * @param event - The selection change event containing the selected values.
     */
    onSelectionChange(event: any): void {
        this.selectedConferences = event.value
        this.onChange(this.selectedConferences)
        this.onTouched()

        if (this.selectionLimit === this.selectedConferences.length && this.conferenceSelectorRef) {
            this.conferenceSelectorRef.hide()
        }
    }

    /**
     * Handles the clear selection event.
     * Resets the selected conferences and notifies the parent component.
     */
    onSelectionClear(): void {
        this.selectedConferences = []
        this.onChange(this.selectedConferences)
        this.onTouched()
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
    writeValue(value: Conference[]): void {
        this.selectedConferences = value?.slice(0, this.selectionLimit ?? value.length) || []
        if (this.conferences.length > 0) {
            this.syncSelectedConferences()
        }
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
