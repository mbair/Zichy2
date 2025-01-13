import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-bathroom-selector',
    templateUrl: './bathroom-selector.component.html'
})
export class BathroomSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    bathrooms: any[] = []            // Available bathrooms
    selectedBathroom: string = ''    // Selected bathroom

    constructor(private translate: TranslateService) {
        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the bathrooms
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setBathrooms()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available bathroom options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setBathrooms()
    }

    /**
     * Returns the FormControl object for the accommodation selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available accommodation options for the accommodation selector component.
     * Translates the accommodation labels to the current language and maps them to their respective values.
     */
    setBathrooms() {
        this.bathrooms = [
            { label: this.translate.instant('BATHROOMS.OWN'), value: 'saját fürdőszoba', color: 'teal' },
            { label: this.translate.instant('BATHROOMS.DORMITORY'), value: 'kollégiumi fürdőszoba', color: 'yellow' },
            { label: this.translate.instant('BATHROOMS.BARRIER-FREE'), value: 'akadályment. fürdőszoba', color: 'red' },
        ]
    }

    /**
     * Handles the change event of the bathroom selector and emits a new value with the
     * changed field name.
     * @param event the change event of the bathroom selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}