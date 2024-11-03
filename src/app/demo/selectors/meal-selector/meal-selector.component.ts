import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-meal-selector',
    templateUrl: './meal-selector.component.html'
})
export class MealSelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Input() showNothing: boolean
    @Input() earliestMeal: string | undefined
    @Input() latestMeal: string | undefined
    @Output() change = new EventEmitter<changeEvent>()

    meals: any[] = []           // Available meals
    selectedMeal: string = ''   // Selected meal

    constructor(private translate: TranslateService) {}
    
    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the meals
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setMeals()
        })
    }

    /**
     * Lifecycle hook: called when any data-bound property of a directive changes.
     * Updates the available meal options when input properties change.
     * @param changes An object of key-value pairs for the changed properties.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.setMeals()
    }

    /**
     * Returns the FormControl object for the meal selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
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
        ]

        if (this.earliestMeal) {
            const earliestIndex = this.meals.findIndex(meal => meal.value === this.earliestMeal)
            if (earliestIndex > 0) {
                this.meals = this.meals.slice(earliestIndex)
            }
        }

        if (this.latestMeal) {
            const latestIndex = this.meals.findIndex(meal => meal.value === this.latestMeal);
            if (latestIndex >= 0) {
                this.meals = this.meals.slice(0, latestIndex + 1)
            }
        }

        if (this.showNothing) {
            this.meals.push({
                label: this.translate.instant('MEALS.NOTHING'), value: 'Nem kér étkezést', style: 'nothing'
            })
        }
    }

    setEarliestMeal(meal: string) {
        this.earliestMeal = meal;
        this.setMeals(); // Frissítse az étkezések listáját
    }
    
    setLatestMeal(meal: string) {
        this.latestMeal = meal;
        this.setMeals(); // Frissítse az étkezések listáját
    }

    /**
     * Handles the change event of the meal selector and emits a new value with the
     * changed field name.
     * @param event the change event of the meal selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}
