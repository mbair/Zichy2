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
    selector: 'app-country-selector',
    templateUrl: './country-selector.component.html'
})
export class CountrySelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    @Output() change = new EventEmitter<changeEvent>()
    
    countries: any[] = []              // Countries
    selectedCountry: string = ''       // Selected country
    optionLabel: string = 'huname'     // Country label
    filterBy: string = 'huname'        // Country filter

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
            // Set Hungary as default country
            const hungary = this.countries.find(country => country.name === 'Hungary')
            if (hungary && this.parentForm && this.controlName) {
                this.parentForm.get(this.controlName)?.setValue(hungary.name)
                this.cdRef.detectChanges() // Notify Angular about the change
            }
        })
        
        // Set the country options when the language changes
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.optionLabel = event.lang === 'hu' ? 'huname' : 'name'
            this.filterBy    = event.lang === 'hu' ? 'huname' : 'name'
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
     * Handles the change event of the country selector and emits a new value with the
     * changed field name.
     * @param event the change event of the country selector
     */
    handleOnChange(event: DropdownChangeEvent) {
        this.change.emit({ value: event.value, field: this.controlName })
    }
}
