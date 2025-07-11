import { Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { TranslateService } from '@ngx-translate/core';
import { DietService } from '../../service/diet.service';
import { Subscription } from 'rxjs';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-diet-selector',
    templateUrl: './diet-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DietSelectorComponent),
            multi: true
        }
    ]
})
export class DietSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() placeholder: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()

    diets: any[] = []               // Available diets
    selectedDiet: string = ''       // Selected diet
    disabled = false

    private subs = new Subscription()

    constructor(private translate: TranslateService, 
                private dietService: DietService,
                private cdRef: ChangeDetectorRef) {

        if (!this.placeholder) {
            this.placeholder = 'Válasszon...'
        }
    }

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the diets
     * for the selector when the language changes.
     */
    ngOnInit() {
        this.subs.add(
            this.translate.onLangChange.subscribe(() => {
                this.setDiets()
            })
        )
        this.setDiets()
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
     * Cleans up all subscriptions when the component is destroyed,
     * preventing potential memory leaks.
     */
    ngOnDestroy() {
        this.subs.unsubscribe()
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
        this.subs.add(
            this.dietService.getDietsForSelector().subscribe((diets: any) => {
                this.diets = diets
                if (this.selectedDiet && !this.diets.some(d => d.value === this.selectedDiet)) {
                    this.selectedDiet = ''
                    this.onChange('')
                }
                this.cdRef.detectChanges()
            })
        )
    }

    /**
     * Handles the change event of the diet selector and emits a new value with the
     * changed field name.
     * @param event the change event of the diet selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.selectedDiet = event.value
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
        this.selectedDiet = value
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