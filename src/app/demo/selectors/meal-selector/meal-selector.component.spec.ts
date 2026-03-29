import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MealSelectorComponent } from './meal-selector.component';

describe('MealSelectorComponent', () => {
    function createComponent(): MealSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new MealSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            meal: new FormControl('reggeli'),
        });
        component.controlName = 'meal';
        component.showNothing = true;

        component.ngOnInit();
        (component as any).dropdown = { value: 'vacsora' };

        component.ngAfterViewChecked();

        expect(component.selectedMeal).toBe('vacsora');
        expect(component.getFormControl()?.value).toBe('vacsora');
    });

    it('clears an already selected meal when it falls outside the updated bounds', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            meal: new FormControl('reggeli'),
        });
        component.controlName = 'meal';

        component.ngOnInit();
        component.earliestMeal = 'ebéd';

        component.ngOnChanges({});

        expect(component.selectedMeal).toBe('');
        expect(component.getFormControl()?.value).toBe('');
    });
});
