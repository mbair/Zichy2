import { Component, EventEmitter, OnInit, Input, Output, ChangeDetectorRef, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CountryService } from '../../service/country.service';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-nationality-selector',
    templateUrl: './nationality-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NationalitySelectorComponent),
            multi: true
        }
    ]
})
export class NationalitySelectorComponent implements OnInit, ControlValueAccessor {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    countries: any[] = []                   // Countries
    selectedNationality: string = ''        // Selected nationality
    optionLabel: string = 'hunationality'
    filterBy: string = 'hunationality'
    disabled = false

    constructor(private translate: TranslateService, 
                private countryService: CountryService,
                private cdRef: ChangeDetectorRef) {}

    /**
     * Lifecycle hook: called when the component is initialized.
     * Subscribes to language change events and sets the countrys
     * for the selector when the language changes.
     */
    ngOnInit() {
        // Fetch countries
        this.countryService.getCountries().subscribe(countries => {
            this.countries = countries
            // Set Hungary as default nationality if applicable
            const hungary = this.countries.find(country => country.name === 'Hungary')
            // if (hungary && this.parentForm && this.controlName) {
            //     this.parentForm.get(this.controlName)?.setValue(hungary.code)
            //     this.cdRef.detectChanges() // Notify Angular about the change
            // }
            if (
                hungary &&
                this.selectedNationality === '' &&
                this.parentForm &&
                this.controlName &&
                !this.parentForm.get(this.controlName)?.value
            ) {
                this.writeValue(hungary.code)
                if (this.parentForm.get(this.controlName)) {
                    this.parentForm.get(this.controlName)?.setValue(hungary.code)
                }
                this.cdRef.detectChanges() // Notify Angular about the change
            }
        })
        
        // Set the country options when the language changes
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.optionLabel = event.lang === 'hu' ? 'hunationality' : 'nationality'
            this.filterBy    = event.lang === 'hu' ? 'hunationality' : 'nationality'
        })
    }

    /**
     * Returns the FormControl object for the country selector.
     * @returns {FormControl} the FormControl object
     */
    getFormControl(): FormControl | null {
        if (!this.parentForm || !this.controlName) {
            return null
        }
        return this.parentForm.get(this.controlName) as FormControl
    }

    /**
     * Handles the change event of the meal selector and emits a new value with the
     * changed field name.
     * @param event the change event of the meal selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.selectedNationality = event.value
        this.onChange(event.value)
        this.onTouched()
        this.change.emit({ value: event.value, field: this.controlName })
    }

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
        this.selectedNationality = value
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
