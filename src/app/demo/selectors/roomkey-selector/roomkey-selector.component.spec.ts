import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomKeySelectorComponent } from './roomkey-selector.component';

describe('RoomKeySelectorComponent', () => {
    function createComponent(): RoomKeySelectorComponent {
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new RoomKeySelectorComponent(cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            roomKey: new FormControl('none'),
        });
        component.controlName = 'roomKey';

        (component as any).dropdown = { value: 'issued' };

        component.ngAfterViewChecked();

        expect(component.selectedValue).toBe('issued');
        expect(component.getFormControl()?.value).toBe('issued');
    });
});
