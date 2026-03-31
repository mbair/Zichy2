import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { GuestComponent } from './guest.component';
import { Guest } from '../../api/guest';
import { Conference } from '../../api/conference';

describe('GuestComponent', () => {
    function createComponent() {
        const guestService = {
            apiURL: 'http://example.test',
            guestObs: of(null),
            messageObs: of(null),
            update$: jasmine.createSpy('update$'),
            create: jasmine.createSpy('create'),
        };

        const userService = {
            hasRole: jasmine.createSpy('hasRole').and.returnValue(of(false)),
        };

        const conferenceService = {
            getById: jasmine.createSpy('getById').and.returnValue(of({ rows: [] })),
        };

        const genderService = {
            genderObs: of([]),
            getGenders: jasmine.createSpy('getGenders'),
        };

        const dietService = {
            getDietsForSelector: jasmine.createSpy('getDietsForSelector').and.returnValue(of([
                { id: 1, name: 'normál', color: 'green' },
                { id: 2, name: 'nem kér étkezést', color: 'gray' },
            ])),
        };

        const countryService = {
            getCountries: jasmine.createSpy('getCountries').and.returnValue(of([])),
        };

        const sessionService = {
            hasActiveSessionSnapshot: jasmine.createSpy('hasActiveSessionSnapshot').and.returnValue(false),
        };

        const messageService = {
            add: jasmine.createSpy('add'),
        };

        const component = new GuestComponent(
            {} as any,
            guestService as any,
            userService as any,
            conferenceService as any,
            {} as any,
            genderService as any,
            dietService as any,
            countryService as any,
            sessionService as any,
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
            genderService,
            conferenceService,
        };
    }

    function createInitializedComponent() {
        const context = createComponent();
        spyOn<any>(context.component, 'startGuestViewPolling').and.stub();
        context.component.ngOnInit();
        return context;
    }

    function buildConference(overrides: Partial<Conference> = {}): Conference {
        return {
            id: 99,
            name: 'Teszt konferencia',
            beginDate: '2026-04-10',
            endDate: '2026-04-12',
            firstMeal: 'ebéd',
            lastMeal: 'vacsora',
            paymentMethodIds: [1, 2],
            roomTypeIds: [1],
            roomTypes: [
                {
                    id: 1,
                    name: 'Kastély szállás 4 ágyas szoba',
                } as any,
            ],
            ...overrides,
        } as Conference;
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
            email: 'teszt@example.com',
            telephone: '+361234567',
            roomType: 'Kastély szállás 4 ágyas szoba',
            payment: 1,
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

    it('adds the same-day meal order validator used by the conference form', () => {
        const { component } = createComponent();

        component.guestForm.patchValue({
            dateOfArrival: '2026-04-10',
            dateOfDeparture: '2026-04-10',
            firstMeal: 'vacsora',
            lastMeal: 'reggeli',
        });

        expect(component.guestForm.errors).toEqual(
            jasmine.objectContaining({ mealOrderInvalid: true }),
        );
    });

    it('synchronizes diet and meal selections like the conference form', () => {
        const { component } = createInitializedComponent();

        component.guestForm.patchValue({ firstMeal: 'nem kér étkezést' });

        expect(component.guestForm.get('diet')?.value).toBe('nem kér étkezést');
        expect(component.guestForm.get('lastMeal')?.value).toBe('nem kér étkezést');

        component.guestForm.patchValue({ diet: 'normál' });

        expect(component.guestForm.get('firstMeal')?.value).toBe('');
        expect(component.guestForm.get('lastMeal')?.value).toBe('');
    });

    it('shows and requires baby bed only for conference guests aged 0-3 who need accommodation', () => {
        const { component } = createInitializedComponent();
        const conference = buildConference();

        component.guestForm.patchValue({
            conference: [conference],
            birthDate: '2024-04-10',
            roomType: 'Kastély szállás 4 ágyas szoba',
        });

        expect(component.showBabyBedField).toBeTrue();
        expect(component.guestForm.get('babyBed')?.enabled).toBeTrue();
        expect(component.guestForm.get('babyBed')?.value).toBe('0');

        component.guestForm.patchValue({ roomType: 'Nem kérek szállást' });

        expect(component.showBabyBedField).toBeFalse();
        expect(component.guestForm.get('babyBed')?.disabled).toBeTrue();
        expect(component.guestForm.get('babyBed')?.value).toBeNull();
    });

    it('accepts an already uploaded id card when the field becomes required in edit mode', () => {
        const { component } = createInitializedComponent();
        const conference = buildConference();
        component.currentIdCardUrl = 'http://example.test/idcard/1';

        component.guestForm.patchValue({
            conference: [conference],
            birthDate: '1990-01-01',
            roomType: 'Kastély szállás 4 ágyas szoba',
            idCard: null,
        });

        expect(component.showIdCardField).toBeTrue();
        expect(component.guestForm.get('idCard')?.valid).toBeTrue();
    });

    it('switches visitor mode to no accommodation and clears accommodation-specific fields', () => {
        const { component } = createInitializedComponent();
        const conference = buildConference();

        component.guestForm.patchValue({
            conference: [conference],
            roomType: 'Kastély szállás 4 ágyas szoba',
            roomMate: ['Teszt Szobatárs'],
            babyBed: '1',
            is_visitor: true,
        });

        expect(component.roomType?.value).toBe('Nem kérek szállást');
        expect(component.roomMate?.value).toBeNull();
        expect(component.needsRoom).toBeFalse();
        expect(component.showBabyBedField).toBeFalse();
    });

    it('shows a warning instead of silently blocking save when visitor meal timing is incomplete', () => {
        const { component, guestService, messageService } = createInitializedComponent();
        const conference = buildConference();

        component.guestForm.patchValue({
            ...buildValidGuest({ id: 1 }),
            conference: [conference],
            is_visitor: true,
            visitor_meals_per_day: 2,
            firstMeal: null,
            lastMeal: 'reggeli',
        });

        component.save();

        expect(guestService.update$).not.toHaveBeenCalled();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'warn',
                summary: 'Hiányzó vagy hibás adat',
            }),
        );
    });

    it('clears disallowed payment and room type values when a conference is selected', () => {
        const { component } = createInitializedComponent();
        const conference = buildConference({
            paymentMethodIds: [1],
            roomTypeIds: [1],
            roomTypes: [{ id: 1, name: 'Kastély szállás 4 ágyas szoba' } as any],
        });

        component.guestForm.patchValue({
            payment: 3,
            roomType: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)',
        });
        component.guestForm.patchValue({ conference: [conference] });

        expect(component.guestForm.get('payment')?.value).toBeNull();
        expect(component.guestForm.get('roomType')?.value).toBeNull();
    });

    it('loads detailed conference data so meal limits use the real first and last meals', () => {
        const { component, conferenceService } = createInitializedComponent();
        const selectorConference = {
            id: 99,
            name: 'Teszt konferencia',
            beginDate: '2026-04-10',
            endDate: '2026-04-12',
        } as Conference;

        conferenceService.getById.and.returnValue(of({
            rows: [buildConference({
                id: 99,
                firstMeal: 'vacsora',
                lastMeal: 'vacsora',
            })],
        }));

        component.guestForm.patchValue({
            conference: [selectorConference],
            dateOfArrival: '2026-04-10',
        });

        expect(component.getEarliestFirstMeal()).toBe('vacsora');
    });

    it('shows the id card field immediately when edit opens for an adult guest needing accommodation', fakeAsync(() => {
        const { component, conferenceService } = createComponent();
        const conference = buildConference({
            guestEditEndDate: '2099-12-31',
        });

        conferenceService.getById.and.returnValue(of({ rows: [conference] }));
        component.canEdit = true;
        component.conferenceSelector = {
            conferences: [conference],
        } as any;

        component.edit(buildValidGuest({
            id: 7,
            birthDate: '1990-01-01',
            roomType: 'Kastély szállás 4 ágyas szoba',
            conferenceid: 99,
        }));

        tick();

        expect(component.showIdCardField).toBeTrue();
        expect(component.guestForm.get('idCard')?.enabled).toBeTrue();
    }));

    it('keeps Maranatha accommodation selected when conference data only exposes legacy room type ids', fakeAsync(() => {
        const { component, conferenceService } = createComponent();
        const selectorConference = buildConference({
            guestEditEndDate: '2099-12-31',
            roomTypeIds: [6],
            roomTypes: undefined as any,
        });

        conferenceService.getById.and.returnValue(of({ rows: [selectorConference] }));
        component.canEdit = true;
        component.conferenceSelector = {
            conferences: [selectorConference],
        } as any;

        component.edit(buildValidGuest({
            id: 8,
            birthDate: '1974.10.16',
            roomType: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)',
            conferenceid: 99,
        }));

        tick();

        expect(component.guestForm.get('roomType')?.value).toBe(
            'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)',
        );
        expect(component.showIdCardField).toBeTrue();
        expect(component.guestForm.get('idCard')?.enabled).toBeTrue();
    }));
});
