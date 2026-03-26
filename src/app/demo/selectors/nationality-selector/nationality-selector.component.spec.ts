import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { NationalitySelectorComponent } from './nationality-selector.component';

describe('NationalitySelectorComponent', () => {
    function createComponent(): NationalitySelectorComponent {
        const translate = {
            currentLang: 'hu',
            defaultLang: 'hu',
            onLangChange: new Subject<any>(),
        };
        const countryService = {
            getCountries: () =>
                of([
                    {
                        name: 'Hungary',
                        code: 'HU',
                        hunationality: 'magyar',
                        nationality: 'Hungarian',
                    },
                    {
                        name: 'Germany',
                        code: 'DE',
                        hunationality: 'nemet',
                        nationality: 'German',
                    },
                ]),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new NationalitySelectorComponent(
            translate as any,
            countryService as any,
            cdRef,
        );
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            nationality: new FormControl('HU'),
        });
        component.controlName = 'nationality';

        component.ngOnInit();
        (component as any).dropdown = { value: 'DE' };

        component.ngAfterViewChecked();

        expect(component.selectedNationality).toBe('DE');
        expect(component.getFormControl()?.value).toBe('DE');
    });
});
