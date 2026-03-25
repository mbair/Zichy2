import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { RoleSelectorComponent } from './role-selector.component';

describe('RoleSelectorComponent', () => {
    function createComponent(): RoleSelectorComponent {
        const roleService = {
            getRolesForSelector: () =>
                of([
                    { id: 1, name: 'Admin' },
                    { id: 2, name: 'Editor' },
                ]),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new RoleSelectorComponent(roleService as any, cdRef);
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            role: new FormControl(null),
        });
        component.controlName = 'role';

        component.ngOnInit();
        (component as any).dropdown = { value: '2' };

        component.ngAfterViewChecked();

        expect(component.selectedRole).toBe('2');
        expect(component.getFormControl()?.value).toBe('2');
    });
});
