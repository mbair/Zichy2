import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractingPartySelectorComponent } from './contracting-party-selector.component';

describe('ContractingPartySelectorComponent', () => {
    function createComponent(): ContractingPartySelectorComponent {
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new ContractingPartySelectorComponent(cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            contractingParty: new FormControl(null),
        });
        component.controlName = 'contractingParty';
        component.options = [
            { contractingPartyId: 1, companyName: 'Alpha' } as any,
            { contractingPartyId: 2, companyName: 'Beta' } as any,
        ];

        (component as any).dropdown = { value: '2' };

        component.ngAfterViewChecked();

        expect(component.selectedContractingParty).toBe('2');
        expect(component.getFormControl()?.value).toBe('2');
    });
});
