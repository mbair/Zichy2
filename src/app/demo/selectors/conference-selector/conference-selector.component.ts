import { Component, forwardRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { Conference } from '../../api/conference';
import { ConferenceService } from '../../service/conference.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-conference-selector',
    templateUrl: './conference-selector.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ConferenceSelectorComponent),
        multi: true
    }]
})
export class ConferenceSelectorComponent implements OnInit, ControlValueAccessor {

    @ViewChild('conferenceSelector') conferenceSelectorRef: MultiSelect

    @Input() selectionLimit?: number                // Maximum number of selectable conferences (optional)
    @Input() selectFirstOption: boolean = false     // Whether to automatically select the first available option
    @Input() placeholder: string                    // Placeholder text for the dropdown
    @Input() showClear: boolean = true              // Whether to show the clear button
    @Input() style: { [key: string]: string } = {}  // Custom style for the dropdown
    @Input() disabledOptions: Conference[] = []     // List of disabled conference IDs

    loading: boolean = true                          // Loading state indicator
    disabled: boolean = false                        // Whether the selector is disabled
    conferences: Conference[] = []                   // List of available conference options
    originalConferences: Conference[] = []           // Original list of conference options
    selectedConferences: Conference[] = []           // List of currently selected conferences

    private subscriptions: Subscription = new Subscription()
    
    constructor(private conferenceService: ConferenceService) { }

    /**
     * Lifecycle hook: Called when the component is initialized.
     * Fetches the list of conferences and selects the first option if required.
     */
    ngOnInit(): void {
        const sub = this.conferenceService.getConferencesForSelector().subscribe(conferences => {
            this.originalConferences = conferences
            this.updateDisabledFlags()
            this.handleSelectFirstOption()
            this.loading = false
        })
        this.subscriptions.add(sub)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabledOptions'] && this.originalConferences.length > 0) {
            this.updateDisabledFlags()
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

        if (this.selectionLimit == this.selectedConferences.length) {
            setTimeout(() => {
                if (this.conferenceSelectorRef) {
                    this.conferenceSelectorRef.hide()
                }
            }, 0)
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
        this.selectedConferences = value || []
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
