import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ColorSelectorComponent } from './color-selector.component';

describe('ColorSelectorComponent', () => {
    function createComponent(): ColorSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const colorService = {
            getColors: () => ['blue', 'green', 'red'],
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new ColorSelectorComponent(
            translate as any,
            colorService as any,
            cdRef,
        );
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            color: new FormControl('blue'),
        });
        component.controlName = 'color';

        component.ngOnInit();
        (component as any).dropdown = { value: 'green' };

        component.ngAfterViewChecked();

        expect(component.selectedColor).toBe('green');
        expect(component.getFormControl()?.value).toBe('green');
    });
});
