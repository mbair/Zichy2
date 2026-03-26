import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { UserSelectorComponent } from './user-selector.component';

describe('UserSelectorComponent', () => {
    function createComponent(): UserSelectorComponent {
        const userService = {
            getUsersForSelector: () =>
                of([
                    { id: 1, fullname: 'Alice Admin', user_rolesid: 1 },
                    { id: 2, fullname: 'Eve Editor', user_rolesid: 2 },
                ]),
        };
        const roleService = {
            fetchRoles: () =>
                of([
                    { id: 1, name: 'Admin' },
                    { id: 2, name: 'Editor' },
                ]),
        };
        const cdRef = {
            detectChanges: () => undefined,
        } as ChangeDetectorRef;

        return new UserSelectorComponent(
            userService as any,
            roleService as any,
            cdRef,
        );
    }

    it('reconciles the dropdown widget value back into the reactive form control', () => {
        const component = createComponent();
        component.parentForm = new FormGroup({
            user: new FormControl(null),
        });
        component.controlName = 'user';

        component.ngOnInit();
        (component as any).dropdown = { value: '2' };

        component.ngAfterViewChecked();

        expect(component.selectedUser).toBe('2');
        expect(component.getFormControl()?.value).toBe('2');
    });
});
