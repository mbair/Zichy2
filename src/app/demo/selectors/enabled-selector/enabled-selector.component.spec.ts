import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { EnabledSelectorComponent } from './enabled-selector.component';

describe('EnabledSelectorComponent', () => {
    function createComponent(): EnabledSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new EnabledSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            enabled: new FormControl('1'),
        });
        component.controlName = 'enabled';

        component.ngOnInit();
        (component as any).dropdown = { value: '0' };

        component.ngAfterViewChecked();

        expect(component.selectedValue).toBe('0');
        expect(component.getFormControl()?.value).toBe('0');
    });
});
