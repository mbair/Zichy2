import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-extrabed-selector',
    templateUrl: './extrabed-selector.component.html'
})
export class ExtrabedSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    extrabeds: any[] = []            // Available extrabeds
    selectedExtrabed: string = ''    // Selected extrabed

    constructor(private translate: TranslateService) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the extrabeds
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setExtrabeds()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available extrabed options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setExtrabeds()
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
    setExtrabeds() {
        this.extrabeds = [
            { label: this.translate.instant('EXTRABEDS.M'), value: 'M' },     // matrac fér be
            { label: this.translate.instant('EXTRABEDS.MM'), value: 'MM' },   // 2 db matrac fér
            { label: this.translate.instant('EXTRABEDS.MGY'), value: 'MGY' }, // matrac és gyerekágy fér be
            { label: this.translate.instant('EXTRABEDS.GY'), value: 'GY' },   // gyerekágy fér be, A matrac helyett befér gyerekágy de fordítva nem
        ]
    }

    /**
     * Handles the change event of the extrabed selector and emits a new value with the
     * changed field name.
     * @param event the change event of the extrabed selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}