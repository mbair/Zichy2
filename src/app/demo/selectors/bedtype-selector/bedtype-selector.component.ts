import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-bedtype-selector',
    templateUrl: './bedtype-selector.component.html'
})
export class BedtypeSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    bedtypes: any[] = []            // Available bedtypes
    selectedBedtype: string = ''    // Selected bedtype

    constructor(private translate: TranslateService) {
        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the bedtypes
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setBedtypes()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available bedtype options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setBedtypes()
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
    setBedtypes() {
        this.bedtypes = [
            { label: this.translate.instant('BEDTYPES.DOUBLE'), value: 'kétágyas', color: 'yellow' },
            { label: this.translate.instant('BEDTYPES.KINGBED'), value: 'franciaágy', color: 'teal' },
            { label: this.translate.instant('BEDTYPES.BUNKBED'), value: 'emeletes ágy', color: 'orange' },
        ]
    }

    /**
     * Handles the change event of the bedtype selector and emits a new value with the
     * changed field name.
     * @param event the change event of the bedtype selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}