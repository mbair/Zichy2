import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-diet-selector',
    templateUrl: './diet-selector.component.html'
})
export class DietSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    diets: any[] = []

    constructor(private translate: TranslateService) {
        this.setDiets()

        // Set the diet options when the language changes
        this.translate.onLangChange.subscribe(() => {
            this.setDiets()
        })
    }

    /**
     * Returns the FormControl object for the diet selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl {
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Sets the available diet options for the diet selector component.
     * Translates the diet labels to the current language and maps them to their respective values.
     */
    setDiets() {
        this.diets = [
            { label: this.translate.instant('DIETS.MILKFREE'), value: 'tejmentes', style: 'milkfree' },
            { label: this.translate.instant('DIETS.LACTOSEFREE'), value: 'laktózmentes', style: 'lactosefree' },
            { label: this.translate.instant('DIETS.GLUTENFREE'), value: 'gluténmentes', style: 'glutenfree' },
            { label: this.translate.instant('DIETS.GLUTEN-LACTOSE-MILKFREE'), value: 'glutén-, laktóz-, tejmentes', style: 'gluten-lactose-milkfree' },
            { label: this.translate.instant('DIETS.VEGETARIAN'), value: 'vegetáriánus', style: 'vegetarian' },
            { label: this.translate.instant('DIETS.NOTHING'), value: 'nem kér étkezést', style: 'nothing' }
        ]
    }
}