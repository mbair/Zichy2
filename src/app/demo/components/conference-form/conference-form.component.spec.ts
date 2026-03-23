import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ConferenceFormComponent } from './conference-form.component';

describe('ConferenceFormComponent', () => {
    let langChange$: Subject<any>;

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

    function createComponent(): ConferenceFormComponent {
        langChange$ = new Subject<any>();
        ensureThemeLink();

        return new ConferenceFormComponent(
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
                add: () => undefined,
                clear: () => undefined,
            } as any,
            {
                conferenceObs: of(null),
                getByFormSlug: () => undefined,
            } as any,
            {
                messageObs: of(null),
                create: () => undefined,
            } as any,
            {
                createdGuestObs: of(null),
                messageObs: of(null),
            } as any,
            {
                hasActiveSessionSnapshot: () => false,
            } as any,
            new FormBuilder(),
            {
                currentLang: 'hu',
                setDefaultLang: () => undefined,
                use: () => undefined,
                instant: (key: string) => key,
                onLangChange: langChange$,
            } as any,
            {
                detectChanges: () => undefined,
            } as any,
        );
    }

    afterEach(() => {
        removeThemeLinks();
    });

    it('clears room selection when a different conference is loaded', () => {
        const component = createComponent();

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
});
