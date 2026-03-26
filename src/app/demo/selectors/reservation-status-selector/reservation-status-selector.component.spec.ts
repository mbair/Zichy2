import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ReservationStatusSelectorComponent } from './reservation-status-selector.component';

describe('ReservationStatusSelectorComponent', () => {
    function createComponent(): ReservationStatusSelectorComponent {
        const translate = {
            instant: (key: string) => key,
            onLangChange: new Subject<any>(),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new ReservationStatusSelectorComponent(translate as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            status: new FormControl('tentative'),
        });
        component.controlName = 'status';

        component.ngOnInit();
        (component as any).dropdown = { value: 'confirmed' };

        component.ngAfterViewChecked();

        expect(component.selectedStatus).toBe('confirmed');
        expect(component.getFormControl()?.value).toBe('confirmed');
    });
});
