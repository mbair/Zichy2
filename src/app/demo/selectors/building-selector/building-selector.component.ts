import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-building-selector',
    templateUrl: './building-selector.component.html'
})
export class BuildingSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    buildings: any[] = []            // Available buildings
    selectedBuilding: string = ''    // Selected building

    constructor(private translate: TranslateService) {
        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the buildings
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setBuildings()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available building options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setBuildings()
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
    setBuildings() {
        this.buildings = [
            { label: this.translate.instant('BUILDINGS.CASTLE'), value: 'castle' },
            { label: this.translate.instant('BUILDINGS.MARANATHA'), value: 'maranatha' },
            { label: this.translate.instant('BUILDINGS.CORNERHOUSE'), value: 'cornerhouse' },
            { label: this.translate.instant('BUILDINGS.LOGOSHOUSE'), value: 'logoshouse' },
            { label: this.translate.instant('BUILDINGS.GATEHOUSE'), value: 'gatehouse' },
            { label: this.translate.instant('BUILDINGS.CARETAKERHOUSE'), value: 'caretakerhouse' },
            { label: this.translate.instant('BUILDINGS.HUNTINGLODGE'), value: 'huntinglodge' },
        ]
    }

    /**
     * Handles the change event of the building selector and emits a new value with the
     * changed field name.
     * @param event the change event of the building selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}