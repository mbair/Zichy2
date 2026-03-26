import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FloorSelectorComponent } from './floor-selector.component';

describe('FloorSelectorComponent', () => {
    function createComponent(): FloorSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new FloorSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            floor: new FormControl('fsz.'),
        });
        component.controlName = 'floor';

        component.ngOnInit();
        (component as any).dropdown = { value: 'I. em.' };

        component.ngAfterViewChecked();

        expect(component.selectedFloor).toBe('I. em.');
        expect(component.getFormControl()?.value).toBe('I. em.');
    });
});
