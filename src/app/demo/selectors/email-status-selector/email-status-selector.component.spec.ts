import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmailStatusSelectorComponent } from './email-status-selector.component';

describe('EmailStatusSelectorComponent', () => {
    function createComponent(): EmailStatusSelectorComponent {
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new EmailStatusSelectorComponent(cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            emailStatus: new FormControl('queued'),
        });
        component.controlName = 'emailStatus';

        (component as any).dropdown = { value: 'sent' };

        component.ngAfterViewChecked();

        expect(component.selectedValue).toBe('sent');
        expect(component.getFormControl()?.value).toBe('sent');
    });
});
