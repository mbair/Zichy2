import { Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-meal-selector',
    templateUrl: './meal-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MealSelectorComponent),
            multi: true
        }
    ]
})
export class MealSelectorComponent implements OnInit, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Input() showNothing: boolean
    @Input() earliestMeal: string | undefined
    @Input() latestMeal: string | undefined
    @Output() change = new EventEmitter<changeEvent>()

    meals: any[] = []           // Available meals
    selectedMeal: string = ''   // Selected meal
    disabled = false

    constructor(private translate: TranslateService, 
                private cdRef: ChangeDetectorRef) {}
    
    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the meals
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.setMeals()
        })
        this.setMeals()
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
            if (earliestIndex > -1) {
                this.meals = this.meals.slice(earliestIndex)
            }
        }
    
        if (this.latestMeal) {
            const latestIndex = this.meals.findIndex(meal => meal.value === this.latestMeal)
            if (latestIndex > -1) {
                this.meals = this.meals.slice(0, latestIndex + 1)
            }
        }
    
        if (this.showNothing) {
            this.meals.push({
                label: this.translate.instant('MEALS.NOTHING'), value: 'nem kér étkezést', style: 'nothing'
            })
        }
    }
    

    /**
     * Sets the earliest meal for the meal selector component and updates the available meal options.
     * The meal selector will only show meals that are equal to or later than the given meal.
     * @param meal the earliest meal
     */
    setEarliestMeal(meal: string) {
        this.earliestMeal = meal
        this.setMeals()
    }
    
    /**
     * Sets the latest meal for the meal selector component and updates the available meal options.
     * @param meal the latest meal
     */
    setLatestMeal(meal: string) {
        this.latestMeal = meal
        this.setMeals()
    }

    /**
     * Handles the change event of the meal selector and emits a new value with the
     * changed field name.
     * @param event the change event of the meal selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.selectedMeal = event.value
        this.onChange(event.value)
        this.onTouched()
        this.change.emit({ value: event.value, field: this.controlName })
    }

    /**
     * Sets the disabled state of the component.
     * Used by Angular forms to enable/disable the input dynamically.
     * 
     * @param isDisabled - Boolean indicating whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
        this.cdRef.detectChanges()
    }

    // ===========================
    // ControlValueAccessor Methods
    // ===========================

    /**
     * Writes the value from the parent form into the component.
     * Used when the form initializes or updates externally.
     * 
     * @param value - The selected conferences coming from the form.
     */
    writeValue(value: any): void {
        this.selectedMeal = value
        this.cdRef.detectChanges()
    }

    /**
     * Registers a callback function that is called when the value changes.
     * This is part of the ControlValueAccessor implementation.
     * 
     * @param fn - The callback function to be triggered on value change.
     */
    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    /**
     * Registers a callback function that is called when the input is touched.
     * This is part of the ControlValueAccessor implementation.
     * 
     * @param fn - The callback function to be triggered on input touch.
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    /**
     * Callback function to handle value changes from the parent form.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onChange = (_: any) => { }

    /**
     * Callback function to handle when the input is touched.
     * Initially set as an empty function, but will be assigned dynamically.
     */
    onTouched = () => { }
}
