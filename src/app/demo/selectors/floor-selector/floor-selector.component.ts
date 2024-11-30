import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-floor-selector',
    templateUrl: './floor-selector.component.html'
})
export class FloorSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    floors: any[] = []            // Available floors
    selectedFloor: string = ''    // Selected floor

    constructor(private translate: TranslateService) {
        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the floors
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setFloors()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available floor options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setFloors()
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
    setFloors() {
        this.floors = [
            { label: this.translate.instant('FLOORS.BASEMENT'), value: 'szuterén', color: 'indigo' },
            { label: this.translate.instant('FLOORS.GROUND'), value: 'fsz.', color: 'blue' },
            { label: this.translate.instant('FLOORS.I-FLOOR'), value: 'I. em.', color: 'cyan' },
            { label: this.translate.instant('FLOORS.II-FLOOR'), value: 'II. em.', color: 'green' },
            { label: this.translate.instant('FLOORS.GATE'), value: 'Kapu első', color: 'yellow' },
            { label: this.translate.instant('FLOORS.CARETAKER'), value: 'Gondnoki emelet', color: 'orange' },
        ]
    }

    /**
     * Handles the change event of the floor selector and emits a new value with the
     * changed field name.
     * @param event the change event of the floor selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}