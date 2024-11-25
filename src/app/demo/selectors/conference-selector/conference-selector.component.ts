import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { TranslateService } from '@ngx-translate/core';
import { ConferenceService } from '../../service/conference.service';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-conference-selector',
    templateUrl: './conference-selector.component.html'
})
export class ConferenceSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Input() placeholder: string
    @Output() change = new EventEmitter<changeEvent>()

    conferences: any[] = []               // Available conferences
    selectedConference: string = ''       // Selected conference

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
        this.conferenceService.getConferencesForSelector().subscribe((conferences: any) => {
            this.conferences = conferences
        })
    }

    /**
     * Handles the change event of the conference selector and emits a new value with the
     * changed field name.
     * @param event the change event of the conference selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}