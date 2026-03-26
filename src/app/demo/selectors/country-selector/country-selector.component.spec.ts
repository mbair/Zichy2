import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CountrySelectorComponent } from './country-selector.component';

describe('CountrySelectorComponent', () => {
    function createComponent(): CountrySelectorComponent {
        const translate = {
            currentLang: 'hu',
            defaultLang: 'hu',
            onLangChange: new Subject<any>(),
        };
        const countryService = {
            getCountries: () =>
                of([
                    { name: 'Hungary', huname: 'Magyarorszag', code: 'HU' },
                    { name: 'Germany', huname: 'Nemetorszag', code: 'DE' },
                ]),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new CountrySelectorComponent(
            translate as any,
            countryService as any,
            cdRef,
        );
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            country: new FormControl('Hungary'),
        });
        component.controlName = 'country';

        component.ngOnInit();
        (component as any).dropdown = { value: 'Germany' };

        component.ngAfterViewChecked();

        expect(component.selectedCountry).toBe('Germany');
        expect(component.getFormControl()?.value).toBe('Germany');
    });
});
