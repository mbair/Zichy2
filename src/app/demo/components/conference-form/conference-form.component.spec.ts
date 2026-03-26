import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ConferenceFormComponent } from './conference-form.component';

describe('ConferenceFormComponent', () => {
    let langChange$: Subject<any>;

    type Harness = {
        component: ConferenceFormComponent;
        answerMessages$: Subject<any>;
        createdGuest$: Subject<any>;
        guestMessages$: Subject<any>;
        guestCreateSpy: jasmine.Spy;
        messageServiceAddSpy: jasmine.Spy;
        answerCreateSpy: jasmine.Spy;
    };

    function ensureThemeLink(): void {
        if (document.getElementById('theme-link')) {
            return;
        }

        const themeLink = document.createElement('link');
        themeLink.id = 'theme-link';
        themeLink.setAttribute(
            'href',
            'assets/layout/styles/theme/lara-light-blue/theme.css',
        );
        document.head.appendChild(themeLink);
    }

    function removeThemeLinks(): void {
        document.getElementById('theme-link')?.remove();
        document.getElementById('theme-link-clone')?.remove();
    }

    function createHarness(): Harness {
        langChange$ = new Subject<any>();
        ensureThemeLink();

        const createdGuest$ = new Subject<any>();
        const guestMessages$ = new Subject<any>();
        const answerMessages$ = new Subject<any>();
        const messageServiceAddSpy = jasmine.createSpy('add');
        const answerCreateSpy = jasmine.createSpy('create');
        const guestCreateSpy = jasmine.createSpy('create');

        const translations: Record<string, string> = {
            'conferenceForm.messages.savePartialSummary':
                'conferenceForm.messages.savePartialSummary',
            'conferenceForm.messages.savePartialDetail':
                'conferenceForm.messages.savePartialDetail',
            'ROOMTYPES.NOTHING': 'Not asking for accommodation',
        };

        const component = new ConferenceFormComponent(
            {
                url: '/conference-form/test-slug',
                navigateByUrl: () => Promise.resolve(true),
            } as any,
            {
                getUserRole: () => of('No Role'),
                hasRole: () => of(false),
            } as any,
            {
                configUpdate$: of({ colorScheme: 'light' }),
                config: { theme: 'blue' },
                onConfigUpdate: () => undefined,
            } as any,
            {
                add: messageServiceAddSpy,
                clear: () => undefined,
            } as any,
            {
                conferenceObs: of(null),
                getByFormSlug: () => undefined,
            } as any,
            {
                messageObs: answerMessages$,
                create: answerCreateSpy,
            } as any,
            {
                createdGuestObs: createdGuest$,
                messageObs: guestMessages$,
                create: guestCreateSpy,
            } as any,
            {
                hasActiveSessionSnapshot: () => false,
            } as any,
            new FormBuilder(),
            {
                currentLang: 'hu',
                setDefaultLang: () => undefined,
                use: () => undefined,
                get: (key: string) => of(translations[key] || key),
                instant: (key: string) => translations[key] || key,
                onLangChange: langChange$,
            } as any,
            {
                initializePublicLanguageFromBrowser: () => 'hu',
                getCurrentContentLanguage: () => 'hu',
            } as any,
            {
                detectChanges: () => undefined,
            } as any,
        );

        component.ngOnInit();

        return {
            component,
            answerMessages$,
            createdGuest$,
            guestMessages$,
            guestCreateSpy,
            messageServiceAddSpy,
            answerCreateSpy,
        };
    }

    afterEach(() => {
        removeThemeLinks();
    });

    it('clears room selection when a different conference is loaded', () => {
        const { component } = createHarness();

        component.conferenceForm.patchValue({
            roomType: 'Kastely szallas 4 agyas szoba',
            roomMate: ['Teszt Tars'],
        });

        (component as any).conference = { id: 10, name: 'Elso konferencia' };
        (component as any).resetRoomSelectionIfConferenceChanged();

        expect(component.roomType?.value).toBe(
            'Kastely szallas 4 agyas szoba',
        );
        expect(component.roomMate?.value).toEqual(['Teszt Tars']);

        (component as any).conference = { id: 11, name: 'Masodik konferencia' };
        (component as any).resetRoomSelectionIfConferenceChanged();

        expect(component.roomType?.value).toBe('');
        expect(component.roomMate?.value).toBeNull();
    });

    it('closes the form with a warning when guest save succeeds but answer save fails', () => {
        const {
            component,
            createdGuest$,
            answerMessages$,
            answerCreateSpy,
            messageServiceAddSpy,
        } = createHarness();

        (component as any).conference = {
            questions: [
                {
                    id: 42,
                    translations: [{ hu: 'Van megjegyzes' }],
                },
            ],
        } as any;

        component.answers.push(new FormBuilder().control('Teszt valasz'));

        createdGuest$.next({ id: 99 });

        expect(answerCreateSpy).toHaveBeenCalled();

        answerMessages$.next({ message: 'Kulon valasz mentesi hiba' });

        expect(component.showForm).toBeFalse();
        expect(messageServiceAddSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'warn',
                summary: 'conferenceForm.messages.savePartialSummary',
                detail: 'Kulon valasz mentesi hiba',
            }),
        );
    });

    it('blocks the registration form when the conference has no configured payment methods', () => {
        const { component } = createHarness();

        component.allowedPaymentMethodIds = [];
        component.showForm = true;
        component.registrationEnded = false;

        expect(component.isPaymentConfigurationMissing).toBeTrue();
        expect(component.canDisplayRegistrationForm).toBeFalse();
    });

    it('shows only the service-provided guest save error toast without adding a second generic error', () => {
        const { guestMessages$, messageServiceAddSpy } = createHarness();

        guestMessages$.next({
            severity: 'error',
            summary: 'Vendég rögzítés sikertelen',
            detail: 'A regisztráció jelenleg nem küldhető el.',
        });

        expect(messageServiceAddSpy.calls.count()).toBe(1);
        expect(messageServiceAddSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'error',
                summary: 'Vendég rögzítés sikertelen',
                detail: 'A regisztráció jelenleg nem küldhető el.',
            }),
        );
    });

    it('does not require id card when the translated room type means no accommodation', () => {
        const { component } = createHarness();

        component.conferenceForm.patchValue({
            birthDate: '1990-05-10',
            roomType: 'Not asking for accommodation',
        });

        component.updateIdCardVisibility();

        expect(component.needsRoom).toBeFalse();
        expect(component.showIdCardField).toBeFalse();
        expect(component.idCard?.disabled).toBeTrue();
    });

    it('normalizes room mate entries from the reactive form control', () => {
        const { component } = createHarness();

        component.roomMate?.setValue(['  Alice  ', 'Bob', 'alice', '', ' Bob ']);

        expect(component.roomMate?.value).toEqual(['Alice', 'Bob']);
    });

    it('commits pending room mate draft text before submit', () => {
        const { component, guestCreateSpy } = createHarness();

        component.conferenceForm.patchValue({
            lastName: 'Teszt',
            firstName: 'Elek',
            gender: 'male',
            birthDate: '2015-05-10',
            nationality: 'Magyar',
            country: 'Hungary',
            zipCode: '1234',
            email: 'teszt@example.com',
            telephone: '+36123456789',
            dateOfArrival: '2026-06-10',
            firstMeal: 'ebed',
            diet: 'normal',
            dateOfDeparture: '2026-06-12',
            lastMeal: 'ebed',
            roomType: 'Kastely szallas 4 agyas szoba',
            roomMate: ['Alice'],
            payment: 1,
            privacy: true,
        });

        (component as any).roomMateChips = {
            inputViewChild: {
                nativeElement: {
                    value: ' Bob ;  Carol, alice ',
                },
            },
        };

        component.onSubmit();

        expect(component.roomMate?.value).toEqual(['Alice', 'Bob', 'Carol']);
        expect(guestCreateSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                roomMate: 'Alice, Bob, Carol',
            }),
            [],
        );
    });

    it('trims string field values before submit', () => {
        const { component, guestCreateSpy } = createHarness();

        component.answers.push(new FormBuilder().control('  Szabad valasz  '));

        component.conferenceForm.patchValue({
            lastName: '  Teszt  ',
            firstName: '  Elek  ',
            gender: 'male',
            birthDate: '2015-05-10',
            nationality: '  Magyar  ',
            country: '  Hungary  ',
            zipCode: ' 1234 ',
            email: '  teszt@example.com  ',
            telephone: '  +36123456789  ',
            dateOfArrival: '2026-06-10',
            firstMeal: ' ebéd ',
            diet: ' normal ',
            dateOfDeparture: '2026-06-12',
            lastMeal: ' ebéd ',
            roomType: ' Kastely szallas 4 agyas szoba ',
            payment: 1,
            privacy: true,
        });

        component.onSubmit();

        expect(component.lastName?.value).toBe('Teszt');
        expect(component.firstName?.value).toBe('Elek');
        expect(component.email?.value).toBe('teszt@example.com');
        expect(component.answers.at(0).value).toBe('Szabad valasz');
        expect(guestCreateSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                lastName: 'Teszt',
                firstName: 'Elek',
                nationality: 'Magyar',
                country: 'Hungary',
                zipCode: '1234',
                email: 'teszt@example.com',
                telephone: '+36123456789',
                firstMeal: 'ebéd',
                diet: 'normal',
                lastMeal: 'ebéd',
                roomType: 'Kastely szallas 4 agyas szoba',
            }),
            [],
        );
    });

    it('treats whitespace-only required text fields as invalid before submit', () => {
        const { component, guestCreateSpy, messageServiceAddSpy } =
            createHarness();

        component.conferenceForm.patchValue({
            lastName: '   ',
            firstName: 'Elek',
            gender: 'male',
            birthDate: '2015-05-10',
            nationality: 'Magyar',
            country: 'Hungary',
            zipCode: '1234',
            email: 'teszt@example.com',
            telephone: '+36123456789',
            dateOfArrival: '2026-06-10',
            firstMeal: 'ebed',
            diet: 'normal',
            dateOfDeparture: '2026-06-12',
            lastMeal: 'ebed',
            roomType: 'Kastely szallas 4 agyas szoba',
            payment: 1,
            privacy: true,
        });

        component.onSubmit();

        expect(component.lastName?.value).toBe('');
        expect(component.lastName?.invalid).toBeTrue();
        expect(guestCreateSpy).not.toHaveBeenCalled();
        expect(messageServiceAddSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'error',
            }),
        );
    });

    it('focuses the first invalid field after an invalid submit', fakeAsync(() => {
        const { component, guestCreateSpy, messageServiceAddSpy } =
            createHarness();
        const focusSpy = jasmine.createSpy('focus');
        const scrollIntoViewSpy = jasmine.createSpy('scrollIntoView');

        (component as any).conferenceFormElement = {
            nativeElement: {
                querySelector: (selector: string) => {
                    if (selector === '#lastName') {
                        return {
                            focus: focusSpy,
                            scrollIntoView: scrollIntoViewSpy,
                            tabIndex: 0,
                            querySelector: () => null,
                        };
                    }

                    return null;
                },
            },
        };

        component.conferenceForm.patchValue({
            lastName: '',
            firstName: 'Elek',
            gender: 'male',
            birthDate: '2015-05-10',
            nationality: 'Magyar',
            country: 'Hungary',
            zipCode: '1234',
            email: 'teszt@example.com',
            telephone: '+36123456789',
            dateOfArrival: '2026-06-10',
            firstMeal: 'ebed',
            diet: 'normal',
            dateOfDeparture: '2026-06-12',
            lastMeal: 'ebed',
            roomType: 'Kastely szallas 4 agyas szoba',
            payment: 1,
            privacy: true,
        });

        component.onSubmit();
        tick();

        expect(guestCreateSpy).not.toHaveBeenCalled();
        expect(messageServiceAddSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'error',
            }),
        );
        expect(scrollIntoViewSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
    }));

    it('ignores duplicate submit attempts while a submission is already loading', () => {
        const { component, guestCreateSpy } = createHarness();

        component.loading = true;
        component.conferenceForm.patchValue({
            lastName: 'Teszt',
            firstName: 'Elek',
            gender: 'male',
            birthDate: '2015-05-10',
            nationality: 'Magyar',
            country: 'Hungary',
            zipCode: '1234',
            email: 'teszt@example.com',
            telephone: '+36123456789',
            dateOfArrival: '2026-06-10',
            firstMeal: 'ebed',
            diet: 'normal',
            dateOfDeparture: '2026-06-12',
            lastMeal: 'ebed',
            roomType: 'Kastely szallas 4 agyas szoba',
            payment: 1,
            privacy: true,
        });

        component.onSubmit();

        expect(guestCreateSpy).not.toHaveBeenCalled();
    });
});
