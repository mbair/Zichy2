import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CountryService } from '../../service/country.service';
import { DropdownChangeEvent } from 'primeng/dropdown';

export interface changeEvent {
    value: string;
    field: string;
}

@Component({
    selector: 'app-nationality-selector',
    templateUrl: './nationality-selector.component.html'
})
export class NationalitySelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    countries: any[] = []                   // Countries
    selectedNationality: string = ''        // Selected nationality
    optionLabel: string = 'hunationality'
    filterBy: string = 'hunationality'

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
            if (hungary && this.parentForm && this.controlName) {
                this.parentForm.get(this.controlName)?.setValue(hungary.code)
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
        this.change.emit({ value: event.value, field: this.controlName })
    }
}
