import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DietSelectorComponent } from './diet-selector.component';

describe('DietSelectorComponent', () => {
    function createComponent(): DietSelectorComponent {
        const translate = {
            onLangChange: new Subject<any>(),
        };
        const dietService = {
            getDietsForSelector: () =>
                of([
                    { name: 'normal', value: 'normal', color: 'green' },
                    { name: 'vegan', value: 'vegan', color: 'teal' },
                ]),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new DietSelectorComponent(
            translate as any,
            dietService as any,
            cdRef,
        );
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            diet: new FormControl('normal'),
        });
        component.controlName = 'diet';

        component.ngOnInit();
        (component as any).dropdown = { value: 'vegan' };

        component.ngAfterViewChecked();

        expect(component.selectedDiet).toBe('vegan');
        expect(component.getFormControl()?.value).toBe('vegan');
    });
});
