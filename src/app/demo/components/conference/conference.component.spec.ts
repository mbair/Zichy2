import { FormArray, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ConferenceComponent } from './conference.component';
import { Conference } from '../../api/conference';

describe('ConferenceComponent', () => {
    function removeThemeLinks(): void {
        document.getElementById('theme-link')?.remove();
        document.getElementById('theme-link-clone')?.remove();
    }

    function createComponent() {
        const conferenceService = {
            update$: jasmine.createSpy('update$'),
            create: jasmine.createSpy('create'),
            messageObs: of(null),
            conferenceObs: of(null),
        };

        const component = new ConferenceComponent(
            {
                hasRole: () => of(true),
                getLoggedInUserId: () => 1,
            } as any,
            {
                navigateByUrl: () => Promise.resolve(true),
            } as any,
            new FormBuilder(),
            {
                config: { theme: 'blue' },
                onConfigUpdate: () => undefined,
            } as any,
            conferenceService as any,
            {
                messageObs: of(null),
            } as any,
            {
                getMeals: () => undefined,
                mealObs: of([]),
            } as any,
            {
                productionURL: 'https://prod.example.com',
                developmentURL: 'https://dev.example.com',
            } as any,
            {
                add: jasmine.createSpy('add'),
            } as any,
            {
                isMobile$: of(false),
            } as any,
        );

        return {
            component,
            conferenceService,
            messageService: (component as any).messageService,
        };
    }

    function buildValidConference(
        overrides: Partial<Conference> = {},
    ): Conference {
        return {
            id: 1,
            name: 'Tavaszi Konferencia',
            beginDate: '2026-05-10',
            endDate: '2026-05-12',
            firstMeal: 'vacsora',
            lastMeal: 'ebed',
            contractorName: 'Teszt Kft.',
            contractorAdress: '8123 Teszt utca 1.',
            contractorTaxNumber: '12345678-1-07',
            contactName: 'Teszt Elek',
            contactEmail: 'teszt@example.com',
            contactPhone: '+3612345678',
            formUrl: 'https://dev.example.com/#/conference-form/tavaszi-konferencia',
            registrationEndDate: '2026-05-01',
            guestEditEndDate: '2026-05-05',
            organizer_user_id: 1,
            contracting_party_id: 2,
            enabled: true,
            acceptanceCriteriaUrl: '',
            paymentMethodIds: [1],
            roomTypeIds: [3],
            ...overrides,
        };
    }

    afterEach(() => {
        removeThemeLinks();
    });

    it('updates the visible conference row immediately after a successful save', () => {
        const { component, conferenceService, messageService } =
            createComponent();
        const originalConference = buildValidConference();
        const updatedConference = buildValidConference({
            name: 'Frissitett Konferencia',
        });

        component.tableData = [originalConference];
        component.filterValues = {};
        component.globalFilter = '';
        component.sortField = '';
        component.sidebar = true;

        conferenceService.update$.and.returnValue(of(updatedConference));
        spyOn(component, 'doQuery');

        component.conferenceForm.patchValue(originalConference);
        component.save();

        expect(conferenceService.update$).toHaveBeenCalledWith(
            jasmine.objectContaining({ id: 1, name: 'Tavaszi Konferencia' }),
        );
        expect(component.tableData[0]).toEqual(updatedConference);
        expect(component.sidebar).toBeFalse();
        expect(component.loading).toBeFalse();
        expect(component.doQuery).not.toHaveBeenCalled();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'success',
                summary: 'Sikeres konferencia módosítás',
            }),
        );
    });

    it('falls back to requery when a filtered conference list may change', () => {
        const { component, conferenceService } = createComponent();
        const originalConference = buildValidConference();
        const updatedConference = buildValidConference({
            name: 'Frissitett Konferencia',
        });

        component.tableData = [originalConference];
        component.filterValues = { enabled: '1' };
        component.globalFilter = '';
        component.sortField = '';

        conferenceService.update$.and.returnValue(of(updatedConference));
        spyOn(component, 'doQuery');

        component.conferenceForm.patchValue(originalConference);
        component.save();

        expect(component.tableData[0]).toEqual(updatedConference);
        expect(component.doQuery).toHaveBeenCalled();
    });

    it('saves form field infos through the same immediate row update flow', () => {
        const { component, conferenceService, messageService } =
            createComponent();
        const originalConference = buildValidConference({
            formFieldInfos: [],
        });
        const savedConference = buildValidConference({
            formFieldInfos: [
                {
                    field: 'email',
                    info: { hu: 'Email magyar', en: 'Email english' },
                    position: 'text',
                },
            ],
        });

        component.tableItem = originalConference;
        component.tableData = [originalConference];
        component.filterValues = {};
        component.globalFilter = '';
        component.sortField = '';
        component.formFieldsInfosSidebar = true;
        component.initializeFormFieldInfosForm();

        const fieldsArray = component.formFieldInfosForm.get('fields') as FormArray;
        const emailFieldGroup = fieldsArray.controls.find(
            (control) => control.get('field')?.value === 'email',
        );
        emailFieldGroup?.get('info.hu')?.setValue('Email magyar');
        emailFieldGroup?.get('info.en')?.setValue('Email english');

        conferenceService.update$.and.returnValue(of(savedConference));
        spyOn(component, 'doQuery');

        component.saveFormFieldInfos();

        expect(conferenceService.update$).toHaveBeenCalledWith(
            jasmine.objectContaining({
                id: 1,
                formFieldInfos: [
                    {
                        field: 'email',
                        info: { hu: 'Email magyar', en: 'Email english' },
                        position: 'text',
                    },
                ],
            }),
        );
        expect(component.tableData[0]).toEqual(savedConference);
        expect(component.formFieldsInfosSidebar).toBeFalse();
        expect(component.loading).toBeFalse();
        expect(component.doQuery).not.toHaveBeenCalled();
        expect(messageService.add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                severity: 'success',
                summary: 'Sikeres konferencia módosítás',
            }),
        );
    });

    it('preserves the default sort when lazy load does not provide a new sort field', () => {
        const { component } = createComponent();

        component.sortField = 'beginDate';
        component.sortOrder = 1;
        spyOn(component, 'doQuery');

        component.onLazyLoad({
            first: 0,
            rows: 20,
            sortField: undefined,
            sortOrder: undefined,
            globalFilter: undefined,
        });

        expect(component.sortField).toBe('beginDate');
        expect(component.sortOrder).toBe(1);
        expect(component.doQuery).toHaveBeenCalled();
    });
});
