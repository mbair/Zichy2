import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { UserComponent } from './user.component';
import { User } from '../../api/user';

describe('UserComponent', () => {
    function createComponent() {
        const userData$ = new BehaviorSubject<any>(null);
        const userMessages$ = new BehaviorSubject<any>(null);

        const userService = {
            userObs: userData$.asObservable(),
            messageObs: userMessages$.asObservable(),
            update$: jasmine.createSpy('update$'),
            create: jasmine.createSpy('create'),
            hasRole: () => of(true),
        };

        const messageService = {
            add: jasmine.createSpy('add'),
        };

        const component = new UserComponent(
            userService as any,
            {
                getRoleStyleClass: () => '',
                getRoleName: () => '',
            } as any,
            messageService as any,
            {
                isMobile$: of(false),
            } as any,
            new FormBuilder(),
        );

        component.ngOnInit();

        return {
            component,
            userService,
            messageService,
        };
    }

    function buildValidUser(overrides: Partial<User> = {}): User {
        return {
            id: '1',
            username: 'teszt@example.com',
            fullname: 'Teszt Elek',
            user_rolesid: 2,
            email: 'teszt@example.com',
            phone: '+3612345678',
            password: 'Titkos123',
            organizerContractingParties: [],
            ...overrides,
        };
    }

    it('updates the visible user row immediately after a successful save', () => {
        const { component, userService, messageService } = createComponent();
        const originalUser = buildValidUser();
        const updatedUser = buildValidUser({
            fullname: 'Frissitett Elek',
        });

        component.tableData = [originalUser];
        component.filterValues = {};
        component.globalFilter = '';
        component.sortField = '';
        component.sidebar = true;

        userService.update$.and.returnValue(of(updatedUser));
        spyOn(component, 'doQuery');

        component.userForm.patchValue(originalUser);
        component.save();

        expect(userService.update$).toHaveBeenCalledWith(
            jasmine.objectContaining({ id: '1', fullname: 'Teszt Elek' }),
        );
        expect(component.tableData[0]).toEqual(updatedUser);
        expect(component.sidebar).toBeFalse();
        expect(component.loading).toBeFalse();
        expect(component.doQuery).not.toHaveBeenCalled();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'success',
                summary: 'Sikeres felhasználó módosítás',
            }),
        );
    });

    it('falls back to requery when active filters may affect the visible result set', () => {
        const { component, userService } = createComponent();
        const originalUser = buildValidUser();
        const updatedUser = buildValidUser({
            fullname: 'Frissitett Elek',
        });

        component.tableData = [originalUser];
        component.filterValues = { user_rolesid: '2' };
        component.globalFilter = '';
        component.sortField = '';

        userService.update$.and.returnValue(of(updatedUser));
        spyOn(component, 'doQuery');

        component.userForm.patchValue(originalUser);
        component.save();

        expect(component.tableData[0]).toEqual(updatedUser);
        expect(component.doQuery).toHaveBeenCalled();
    });
});
