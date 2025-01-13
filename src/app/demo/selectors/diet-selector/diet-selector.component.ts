import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { TranslateService } from '@ngx-translate/core';
import { DietService } from '../../service/diet.service';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-diet-selector',
    templateUrl: './diet-selector.component.html'
})
export class DietSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()

    diets: any[] = []               // Available diets
    selectedDiet: string = ''       // Selected diet

    constructor(private translate: TranslateService, 
                private dietService: DietService) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the diets
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setDiets()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available diet options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setDiets()
    }

    /**
     * Returns the FormControl object for the diet selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available diet options for the diet selector component.
     * Translates the diet labels to the current language and maps them to their respective values.
     */
    setDiets() {
        this.dietService.getDietsForSelector().subscribe((diets: any) => {
            this.diets = diets
        })
    }

    /**
     * Handles the change event of the diet selector and emits a new value with the
     * changed field name.
     * @param event the change event of the diet selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}