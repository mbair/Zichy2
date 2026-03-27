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

    function birthDateYearsAgo(years: number): string {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(Math.min(now.getDate(), 28)).padStart(2, '0');

        return `${now.getFullYear() - years}-${month}-${day}`;
    }

    function fillValidRegistrationForm(
        component: ConferenceFormComponent,
        overrides: Record<string, unknown> = {},
    ): void {
        component.conferenceForm.patchValue({
            lastName: 'Teszt',
            firstName: 'Elek',
            gender: 'male',
            birthDate: birthDateYearsAgo(20),
            nationality: 'Magyar',
            country: 'Hungary',
            zipCode: '1234',
            email: 'teszt@example.com',
            telephone: '+36123456789',
            dateOfArrival: '2026-06-10',
            firstMeal: 'ebéd',
            diet: 'normál',
            dateOfDeparture: '2026-06-12',
            lastMeal: 'vacsora',
            roomType: 'Not asking for accommodation',
            roomMate: null,
            payment: 1,
            privacy: true,
            ...overrides,
        });
    }

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
            'conferenceForm.messages.saveSuccessWithWarningSummary':
                'conferenceForm.messages.saveSuccessWithWarningSummary',
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
            {
                isMobile$: of(false),
                getIsMobile: () => false,
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
        expect(component.submissionFeedback).toEqual(
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

    it('shows the service-provided guest save error as inline feedback and scrolls to it', fakeAsync(() => {
        const { component, guestMessages$, messageServiceAddSpy } =
            createHarness();
        const focusSpy = jasmine.createSpy('focus');

        (component as any).formFeedbackElement = {
            nativeElement: {
                focus: focusSpy,
                getBoundingClientRect: () => ({
                    top: 280,
                    left: 0,
                    width: 640,
                    height: 120,
                    bottom: 400,
                    right: 640,
                    x: 0,
                    y: 280,
                    toJSON: () => ({}),
                }),
            },
        };

        spyOn(window, 'scrollTo');

        guestMessages$.next({
            severity: 'error',
            summary: 'Vendég rögzítés sikertelen',
            detail: 'A regisztráció jelenleg nem küldhető el.',
        });

        tick();

        expect(messageServiceAddSpy).not.toHaveBeenCalled();
        expect(component.formFeedback).toEqual(
            jasmine.objectContaining({
                severity: 'error',
                summary: 'Vendég rögzítés sikertelen',
                detail: 'A regisztráció jelenleg nem küldhető el.',
            }),
        );
        expect(window.scrollTo).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
    }));

    it('shows non-error guest service messages in the page feedback area and scrolls to them', fakeAsync(() => {
        const { component, guestMessages$, messageServiceAddSpy } =
            createHarness();
        const focusSpy = jasmine.createSpy('focus');

        (component as any).pageFeedbackElement = {
            nativeElement: {
                focus: focusSpy,
                getBoundingClientRect: () => ({
                    top: 120,
                    left: 0,
                    width: 640,
                    height: 96,
                    bottom: 216,
                    right: 640,
                    x: 0,
                    y: 120,
                    toJSON: () => ({}),
                }),
            },
        };

        spyOn(window, 'scrollTo');

        guestMessages$.next({
            severity: 'warn',
            summary: 'E-mail',
            detail: 'A visszaigazoló e-mailt most nem sikerült elküldeni.',
        });

        tick();

        expect(messageServiceAddSpy).not.toHaveBeenCalled();
        expect(component.pageFeedback).toEqual(
            jasmine.objectContaining({
                severity: 'warn',
                summary: 'E-mail',
                detail: 'A visszaigazoló e-mailt most nem sikerült elküldeni.',
            }),
        );
        expect(window.scrollTo).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
    }));

    it('clears page feedback when save succeeds', () => {
        const { component } = createHarness();

        component.pageFeedback = {
            severity: 'warn',
            summary: 'Korabbi uzenet',
            detail: 'Korabbi reszlet',
        };

        component.saveSuccess();

        expect(component.pageFeedback).toBeNull();
        expect(component.submissionFeedback).toEqual(
            jasmine.objectContaining({
                severity: 'success',
            }),
        );
    });

    it('clears page feedback when starting a new registration', () => {
        const { component } = createHarness();

        component.pageFeedback = {
            severity: 'info',
            summary: 'Korabbi uzenet',
            detail: 'Korabbi reszlet',
        };
        component.showForm = false;

        component.newRegistration();

        expect(component.pageFeedback).toBeNull();
        expect(component.showForm).toBeTrue();
    });

    it('keeps post-save guest warnings in the submission feedback area and scrolls there', fakeAsync(() => {
        const { component, guestMessages$, messageServiceAddSpy } =
            createHarness();
        (component as any).submissionFeedbackElement = {
            nativeElement: {
                getBoundingClientRect: () => ({
                    top: 620,
                    left: 0,
                    width: 640,
                    height: 120,
                    bottom: 740,
                    right: 640,
                    x: 0,
                    y: 620,
                    toJSON: () => ({}),
                }),
            },
        };

        spyOn(window, 'scrollTo');

        component.saveSuccess();
        guestMessages$.next({
            severity: 'warn',
            summary: 'E-mail',
            detail: 'A visszaigazoló e-mailt most nem sikerült elküldeni.',
        });

        tick();

        expect(messageServiceAddSpy).not.toHaveBeenCalled();
        expect(component.pageFeedback).toBeNull();
        expect(component.submissionFeedback).toEqual(
            jasmine.objectContaining({
                severity: 'warn',
                summary:
                    'conferenceForm.messages.saveSuccessWithWarningSummary',
                detail:
                    'conferenceForm.messages.saveSuccessDetail\n\nE-mail: A visszaigazoló e-mailt most nem sikerült elküldeni.',
            }),
        );
        expect(window.scrollTo).toHaveBeenCalled();
    }));

    it('does not require id card when the translated room type means no accommodation', () => {
        const { component } = createHarness();

        component.conferenceForm.patchValue({
            birthDate: birthDateYearsAgo(20),
            roomType: 'Not asking for accommodation',
        });

        component.updateIdCardVisibility();

        expect(component.needsRoom).toBeFalse();
        expect(component.showIdCardField).toBeFalse();
        expect(component.idCard?.disabled).toBeTrue();
    });

    it('applies the accommodation dependency matrix to room mate, id card and baby bed controls', () => {
        const { component } = createHarness();

        const cases = [
            {
                name: 'no accommodation adult',
                birthDate: birthDateYearsAgo(20),
                roomType: 'Not asking for accommodation',
                expects: {
                    needsRoom: false,
                    roomMateDisabled: true,
                    showIdCardField: false,
                    idCardDisabled: true,
                    idCardRequired: false,
                    showBabyBedField: false,
                    babyBedDisabled: true,
                    babyBedValue: null,
                },
            },
            {
                name: 'accommodation adult',
                birthDate: birthDateYearsAgo(20),
                roomType: 'Kastely szallas 4 agyas szoba',
                expects: {
                    needsRoom: true,
                    roomMateDisabled: false,
                    showIdCardField: true,
                    idCardDisabled: false,
                    idCardRequired: true,
                    showBabyBedField: false,
                    babyBedDisabled: true,
                    babyBedValue: null,
                },
            },
            {
                name: 'accommodation child',
                birthDate: birthDateYearsAgo(10),
                roomType: 'Kastely szallas 4 agyas szoba',
                expects: {
                    needsRoom: true,
                    roomMateDisabled: false,
                    showIdCardField: false,
                    idCardDisabled: true,
                    idCardRequired: false,
                    showBabyBedField: false,
                    babyBedDisabled: true,
                    babyBedValue: null,
                },
            },
            {
                name: 'accommodation toddler',
                birthDate: birthDateYearsAgo(2),
                roomType: 'Kastely szallas 4 agyas szoba',
                expects: {
                    needsRoom: true,
                    roomMateDisabled: false,
                    showIdCardField: false,
                    idCardDisabled: true,
                    idCardRequired: false,
                    showBabyBedField: true,
                    babyBedDisabled: false,
                    babyBedValue: '0',
                },
            },
        ];

        cases.forEach((testCase) => {
            component.conferenceForm.reset();
            component.roomType?.setValue(testCase.roomType);
            component.birthDate?.setValue(testCase.birthDate);

            component.idCard?.setValue(null);
            component.idCard?.updateValueAndValidity({ emitEvent: false });

            expect(component.needsRoom).withContext(testCase.name).toBe(
                testCase.expects.needsRoom,
            );
            expect(component.roomMate?.disabled).withContext(testCase.name).toBe(
                testCase.expects.roomMateDisabled,
            );
            expect(component.showIdCardField)
                .withContext(testCase.name)
                .toBe(testCase.expects.showIdCardField);
            expect(component.idCard?.disabled)
                .withContext(testCase.name)
                .toBe(testCase.expects.idCardDisabled);
            expect(!!component.idCard?.errors?.['required'])
                .withContext(testCase.name)
                .toBe(testCase.expects.idCardRequired);
            expect(component.showBabyBedField)
                .withContext(testCase.name)
                .toBe(testCase.expects.showBabyBedField);
            expect(component.babyBed?.disabled)
                .withContext(testCase.name)
                .toBe(testCase.expects.babyBedDisabled);
            expect(component.babyBed?.value)
                .withContext(testCase.name)
                .toBe(testCase.expects.babyBedValue);
        });
    });

    it('clears accommodation-dependent values when switching to no accommodation', () => {
        const { component } = createHarness();
        const idCardFile = new File(['id'], 'idcard.pdf', {
            type: 'application/pdf',
        });

        fillValidRegistrationForm(component, {
            birthDate: birthDateYearsAgo(20),
            roomType: 'Kastely szallas 4 agyas szoba',
            roomMate: ['Alice', 'Bob'],
        });
        component.idCard?.setValue(idCardFile);

        component.roomType?.setValue('Not asking for accommodation');

        expect(component.needsRoom).toBeFalse();
        expect(component.roomMate?.disabled).toBeTrue();
        expect(component.roomMate?.value).toBeNull();
        expect(component.showIdCardField).toBeFalse();
        expect(component.idCard?.disabled).toBeTrue();
        expect(component.idCard?.value).toBeNull();
        expect(component.showBabyBedField).toBeFalse();
        expect(component.babyBed?.disabled).toBeTrue();
        expect(component.babyBed?.value).toBeNull();
    });

    it('validates Hungarian zip codes but relaxes the format check for foreign countries', () => {
        const { component } = createHarness();

        component.country?.setValue('Hungary');
        component.zipCode?.setValue('12AB');
        component.zipCode?.markAsTouched();
        component.zipCode?.updateValueAndValidity();

        expect(component.zipCode?.errors?.['invalidZipCode']).toBeTrue();

        component.country?.setValue('Austria');
        component.zipCode?.updateValueAndValidity();

        expect(component.zipCode?.errors?.['invalidZipCode']).toBeFalsy();
        expect(component.zipCode?.valid).toBeTrue();
    });

    it('syncs the no-meal selection across diet and meal controls in both directions', () => {
        const { component } = createHarness();

        component.diet?.setValue('nem kér étkezést');
        expect(component.firstMeal?.value).toBe('nem kér étkezést');
        expect(component.lastMeal?.value).toBe('nem kér étkezést');

        component.firstMeal?.setValue('ebéd');
        expect(component.diet?.value).toBe('');

        component.lastMeal?.setValue('nem kér étkezést');
        expect(component.diet?.value).toBe('nem kér étkezést');
        expect(component.firstMeal?.value).toBe('nem kér étkezést');

        component.diet?.setValue('normál');
        expect(component.firstMeal?.value).toBe('');
        expect(component.lastMeal?.value).toBe('');
    });

    it('marks the form invalid for reversed date range and invalid same-day meal order', () => {
        const { component, guestCreateSpy } = createHarness();

        fillValidRegistrationForm(component, {
            dateOfArrival: '2026-06-12',
            dateOfDeparture: '2026-06-10',
        });

        component.onSubmit();

        expect(component.conferenceForm.errors?.['dateRangeInvalid']).toBeTrue();
        expect(guestCreateSpy).not.toHaveBeenCalled();

        fillValidRegistrationForm(component, {
            dateOfArrival: '2026-06-10',
            dateOfDeparture: '2026-06-10',
            firstMeal: 'vacsora',
            lastMeal: 'ebéd',
        });

        component.onSubmit();

        expect(component.conferenceForm.errors?.['mealOrderInvalid']).toBeTrue();
        expect(guestCreateSpy).not.toHaveBeenCalled();
    });

    it('applies conference date bounds to arrival and departure controls', () => {
        const { component } = createHarness();

        (component as any).beginDate = new Date(2026, 5, 10);
        (component as any).endDate = new Date(2026, 5, 12);
        (component as any).applyConferenceDateBoundsValidators();

        component.dateOfArrival?.setValue('2026-06-09');
        component.dateOfDeparture?.setValue('2026-06-13');

        expect(component.dateOfArrival?.errors?.['dateOutOfRange']).toBeTrue();
        expect(component.dateOfDeparture?.errors?.['dateOutOfRange']).toBeTrue();
    });

    it('blocks submit for accommodated adults until an id card file is provided', () => {
        const { component, guestCreateSpy } = createHarness();

        fillValidRegistrationForm(component, {
            birthDate: birthDateYearsAgo(20),
            roomType: 'Kastely szallas 4 agyas szoba',
        });

        component.onSubmit();

        expect(component.showIdCardField).toBeTrue();
        expect(component.idCard?.errors?.['required']).toBeTrue();
        expect(guestCreateSpy).not.toHaveBeenCalled();
    });

    it('allows submitting without id card when no accommodation is requested', () => {
        const { component, guestCreateSpy } = createHarness();

        fillValidRegistrationForm(component, {
            birthDate: birthDateYearsAgo(20),
            roomType: 'Not asking for accommodation',
        });

        component.onSubmit();

        expect(component.idCard?.disabled).toBeTrue();
        expect(guestCreateSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                roomType: 'Not asking for accommodation',
            }),
            [],
        );
    });

    it('defaults baby bed for accommodated toddlers and does not require id card for them on submit', () => {
        const { component, guestCreateSpy } = createHarness();

        fillValidRegistrationForm(component, {
            birthDate: birthDateYearsAgo(2),
            roomType: 'Kastely szallas 4 agyas szoba',
        });

        component.onSubmit();

        expect(component.showBabyBedField).toBeTrue();
        expect(component.babyBed?.value).toBe('0');
        expect(component.showIdCardField).toBeFalse();
        expect(guestCreateSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({
                babyBed: '0',
                roomType: 'Kastely szallas 4 agyas szoba',
            }),
            [],
        );
    });

    it('prevents submit when payment configuration is missing even with otherwise valid data', () => {
        const { component, guestCreateSpy } = createHarness();

        component.allowedPaymentMethodIds = [];
        fillValidRegistrationForm(component);

        component.onSubmit();

        expect(component.isPaymentConfigurationMissing).toBeTrue();
        expect(guestCreateSpy).not.toHaveBeenCalled();
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
        const { component, guestCreateSpy } = createHarness();

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
        expect(component.showInvalidFieldSummary).toBeTrue();
    });

    it('focuses the first invalid field after an invalid submit', fakeAsync(() => {
        const { component, guestCreateSpy } = createHarness();
        const focusSpy = jasmine.createSpy('focus');

        spyOn(window, 'scrollTo');

        (component as any).conferenceFormElement = {
            nativeElement: {
                querySelector: (selector: string) => {
                    if (selector === '#lastName') {
                        return {
                            focus: focusSpy,
                            tabIndex: 0,
                            closest: () => null,
                            classList: {
                                add: () => undefined,
                                remove: () => undefined,
                            },
                            offsetWidth: 320,
                            getBoundingClientRect: () => ({
                                top: 180,
                                left: 0,
                                width: 320,
                                height: 48,
                                bottom: 228,
                                right: 320,
                                x: 0,
                                y: 180,
                                toJSON: () => ({}),
                            }),
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
        tick(300);

        expect(guestCreateSpy).not.toHaveBeenCalled();
        expect(window.scrollTo).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
        tick(1800);
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
