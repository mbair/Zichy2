import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { GuestComponent } from './guest.component';
import { Guest } from '../../api/guest';

describe('GuestComponent', () => {
    function createComponent() {
        const guestService = {
            update$: jasmine.createSpy('update$'),
            create: jasmine.createSpy('create'),
        };

        const messageService = {
            add: jasmine.createSpy('add'),
        };

        const component = new GuestComponent(
            {} as any,
            guestService as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            messageService as any,
            {} as any,
            {} as any,
            { detectChanges: () => undefined } as any,
            new FormBuilder(),
        );

        return {
            component,
            guestService,
            messageService,
        };
    }

    function buildValidGuest(overrides: Partial<Guest> = {}): Guest {
        return {
            id: 1,
            firstName: 'Teszt',
            lastName: 'Vendeg',
            gender: 1,
            nationality: 'HU',
            country: 'Hungary',
            zipCode: '8123',
            dateOfArrival: '2026-04-10',
            firstMeal: 'vacsora',
            dateOfDeparture: '2026-04-12',
            lastMeal: 'ebed',
            birthDate: '1990-01-01',
            diet: 'normál',
            enabled: 1,
            reservations: [],
            ...overrides,
        };
    }

    it('updates the visible guest row immediately after a successful save', () => {
        const { component, guestService, messageService } = createComponent();
        const originalGuest = buildValidGuest();
        const updatedGuest = buildValidGuest({
            lastName: 'Frissitve',
            email: 'teszt@example.com',
        });

        component.tableData = [originalGuest];
        component.sidebar = true;

        guestService.update$.and.returnValue(of(updatedGuest));

        component.guestForm.patchValue(originalGuest);
        component.save();

        expect(guestService.update$).toHaveBeenCalledWith(
            jasmine.objectContaining({ id: 1, lastName: 'Vendeg' }),
            [],
        );
        expect(component.tableData[0]).toEqual(
            jasmine.objectContaining({
                id: 1,
                lastName: 'Frissitve',
                email: 'teszt@example.com',
                actualReservation: null,
            }),
        );
        expect(component.sidebar).toBeFalse();
        expect(component.loading).toBeFalse();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'success',
                summary: 'Sikeres mentés',
            }),
        );
    });

    it('falls back to requery when the updated guest row is not on the current page', () => {
        const { component, guestService } = createComponent();
        const updatedGuest = buildValidGuest({ id: 2, lastName: 'Masik' });

        component.tableData = [buildValidGuest({ id: 1 })];
        guestService.update$.and.returnValue(of(updatedGuest));
        spyOn(component, 'doQuery');

        component.guestForm.patchValue(buildValidGuest({ id: 2 }));
        component.save();

        expect(component.doQuery).toHaveBeenCalled();
    });
});
