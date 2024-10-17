import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-meal-selector',
    templateUrl: './meal-selector.component.html'
})
export class MealSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    meals: any[] = []

    constructor(private translate: TranslateService) {
        this.setMeals()

        // Set the meal options when the language changes
        this.translate.onLangChange.subscribe(() => {
            this.setMeals()
        })
    }

    /**
     * Returns the FormControl object for the meal selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl {
        return this.parentForm.get(this.controlName) as FormControl
    }


    /**
     * Sets the available meal options for the meal selector component.
     * Translates the meal labels to the current language and maps them to their respective values.
     */
    setMeals() {
        this.meals = [
            { label: this.translate.instant('MEALS.BREAKFAST'), value: 'reggeli', style: 'breakfast' },
            { label: this.translate.instant('MEALS.LUNCH'), value: 'ebéd', style: 'lunch' },
            { label: this.translate.instant('MEALS.DINNER'), value: 'vacsora', style: 'dinner' },
            { label: this.translate.instant('MEALS.NOTHING'), value: 'Nem kér étkezést', style: 'nothing' }
        ]
    }
}
