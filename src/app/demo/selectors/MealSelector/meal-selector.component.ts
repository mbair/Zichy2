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
    meals: any[] = []

    constructor(private translate: TranslateService) {
        this.setMeals()

        // Nyelvváltás figyelése
        this.translate.onLangChange.subscribe(() => {
            this.setMeals()
        })
    }

    getFormControl(): FormControl {
        return this.parentForm.get(this.controlName) as FormControl
    }


    setMeals() {
        this.meals = [
            { label: this.translate.instant('MEALS.BREAKFAST'), value: 'reggeli' },
            { label: this.translate.instant('MEALS.LUNCH'), value: 'ebéd' },
            { label: this.translate.instant('MEALS.DINNER'), value: 'vacsora' },
            { label: this.translate.instant('MEALS.NOTHING'), value: 'Nem kér étkezést' }
        ]
    }
}
