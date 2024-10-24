import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CountryService } from '../../service/country.service';

@Component({
    selector: 'app-country-selector',
    templateUrl: './country-selector.component.html'
})
export class CountrySelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    
    countries: any[] = []              // Countries
    selectedCountry: string = ''       // Selected country
    optionLabel: string = 'huname'     // Country label
    filterBy: string = 'huname'        // Country filter

    constructor(private translate: TranslateService, 
                private countryService: CountryService) {

        // Fetch countries
        this.countryService.getCountries().subscribe(countries => {
            this.countries = countries
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
}




