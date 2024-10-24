import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CountryService } from '../../service/country.service';

@Component({
    selector: 'app-nationality-selector',
    templateUrl: './nationality-selector.component.html'
})
export class NationalitySelectorComponent {
    @Input() parentForm: FormGroup
    @Input() controlName: string
    @Input() showClear: boolean
    
    countries: any[] = []                   // Countries
    selectedNationality: string = ''        // Selected nationality
    optionLabel: string = 'hunationality'
    filterBy: string = 'hunationality'

    constructor(private translate: TranslateService, 
                private countryService: CountryService) {

        // Fetch countries
        this.countryService.getCountries().subscribe(countries => {
            this.countries = countries
        })

        // Set the nationality options when the language changes
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
}




