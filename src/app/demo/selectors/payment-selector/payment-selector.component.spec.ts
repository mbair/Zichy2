import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { PaymentSelectorComponent } from './payment-selector.component';

describe('PaymentSelectorComponent', () => {
    function createComponent(): PaymentSelectorComponent {
        const langChange$ = new Subject<void>();

        return new PaymentSelectorComponent(
            {
                instant: (key: string) => key,
                onLangChange: langChange$,
            } as any,
            {
                detectChanges: () => undefined,
            } as any,
        );
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();

        component.parentForm = new FormGroup({
            payment: new FormControl(null),
        });
        component.controlName = 'payment';

        component.ngOnInit();
        (component as any).dropdown = { value: '3' };

        component.ngAfterViewChecked();

        expect(component.selectedPayment).toBe(3);
        expect(component.parentForm.get('payment')?.value).toBe(3);
    });

    it('normalizes and filters multiselect widget values before syncing them into the form control', () => {
        const component = createComponent();

        component.parentForm = new FormGroup({
            payment: new FormControl([]),
        });
        component.controlName = 'payment';
        component.multiple = true;
        component.allowedPaymentMethodIds = [1, 3];

        component.ngOnInit();
        (component as any).multiSelect = { value: ['1', '2', '3'] };

        component.ngAfterViewChecked();

        expect(component.selectedPayment).toEqual([1, 3]);
        expect(component.parentForm.get('payment')?.value).toEqual([1, 3]);
    });
});
