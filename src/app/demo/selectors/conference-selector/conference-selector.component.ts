import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { TranslateService } from '@ngx-translate/core';
import { MultiSelect } from 'primeng/multiselect'
import { ConferenceService } from '../../service/conference.service';
import { Conference } from '../../api/conference';
import { isEqual } from 'lodash'

export interface changeEvent {
    value: Conference[];
    field: string;
}

@Component({
    selector: 'app-conference-selector',
    templateUrl: './conference-selector.component.html'
})
export class ConferenceSelectorComponent {
    @ViewChild('conferenceSelector') conferenceSelectorRef: MultiSelect
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Input() placeholder: string
    @Input() selectionLimit: number
    @Input() selectFirstOption: boolean
    @Input() style: { [key: string]: string }
    @Output() change = new EventEmitter<changeEvent>()

    loading: boolean = true                          // Loading overlay trigger value
    conferences: Conference[] = []                   // Available conferences
    selectedConferences: Conference[] = []           // Selected conferences
    previousSelectedConferences: Conference[] = []   // Previously selected conferences

    constructor(private translate: TranslateService, 
                private conferenceService: ConferenceService) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the conferences
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setConferences()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available conference options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setConferences()
    }

    /**
     * Returns the FormControl object for the conference selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available conference options for the conference selector component.
     * Translates the conference labels to the current language and maps them to their respective values.
     */
    setConferences() {
        this.loading = true
        this.conferenceService.getConferencesForSelector().subscribe((conferences: Conference[]) => {
            this.conferences = conferences
    
            if (this.selectFirstOption && this.conferences.length > 0) {
                // If there is a selectionLimit, we take the first N elements, otherwise all
                const limit = this.selectionLimit ?? this.conferences.length
                this.selectedConferences = this.conferences.slice(0, limit)
    
                // Set the value of the form control to the selected conference name
                this.getFormControl()?.setValue(this.selectedConferences.map(c => c.name) || null)
    
                const event: DropdownChangeEvent = {
                    originalEvent: {} as Event,
                    value: this.selectedConferences.map(c => c.name) || null
                }
    
                this.handleOnChange(event)
            }
        })
    }
    
    /**
     * Handles the change event of the conference selector and emits the selected conference object
     * with the changed field name.
     * @param event the change event of the conference selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.selectedConferences = event.value
        this.getFormControl()?.setValue(this.selectedConferences)

        // Hide the dropdown if the selection limit is reached and the dropdown is open
        if (this.selectionLimit === this.selectedConferences.length) {
            setTimeout(() => this.conferenceSelectorRef?.hide(), 0)
        }

        // If seleted conferences are different from the previous ones, emit the change event
        if (!isEqual(this.selectedConferences, this.previousSelectedConferences)) {
            this.change.emit({ value: this.selectedConferences, field: this.controlName })
            this.previousSelectedConferences = [...this.selectedConferences]
        }
    }    

    /**
     * Handles the hide event of the conference selector and emits the selected conference object
     * with the changed field name.
     * @param event the hide event of the conference selector
     * @returns {void}
     * @emits {changeEvent} the selected conference object with the changed field name
     */
    onPanelHide() {
        if (!isEqual(this.selectedConferences, this.previousSelectedConferences)) {
            this.change.emit({ value: this.selectedConferences, field: this.controlName })
            this.previousSelectedConferences = [...this.selectedConferences]
        }
    }
    
    /**
     * Handles the clear event of the conference selector and emits a new value with the
     * changed field name.
     * @param event the clear event of the conference selector
     */
    handleOnClear() {
        this.selectedConferences = []
        this.getFormControl()?.setValue([])
    
        // Emit the change event with an empty array
        this.handleOnChange({ value: [], originalEvent: new Event('clear') })
    }
}