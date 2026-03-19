import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../demo/service/auth.service';
import { SessionService, SessionWarningState } from '../demo/service/session.service';
import { HELP_SIDEBAR_CONTENT } from './help/help-sidebar-content.data';
import { AppLayoutComponent } from './app.layout.component';
import { LayoutService } from './service/app.layout.service';

describe('AppLayoutComponent', () => {
    let navigationEvents$: Subject<NavigationEnd>;
    let sessionWarning$: Subject<SessionWarningState>;
    let layoutServiceSpy: jasmine.SpyObj<LayoutService> & LayoutService;
    let menuServiceSpy: { reset: jasmine.Spy };
    let rendererSpy: { listen: jasmine.Spy };
    let routerStub: Router;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let sessionServiceSpy: jasmine.SpyObj<SessionService> & Pick<SessionService, 'sessionWarning$'>;

    function createRouteSnapshotChain(...dataEntries: Array<Record<string, unknown>>): any {
        return dataEntries.reduceRight<any>((firstChild, data) => ({
            data,
            firstChild,
        }), null);
    }

    function emitNavigation(url: string): void {
        navigationEvents$.next(new NavigationEnd(1, url, url));
    }

    beforeEach(() => {
        navigationEvents$ = new Subject<NavigationEnd>();
        sessionWarning$ = new Subject<SessionWarningState>();

        layoutServiceSpy = jasmine.createSpyObj<LayoutService>('LayoutService', ['hideHelpSidebar']);
        layoutServiceSpy.hideHelpSidebar.and.callFake(() => {
            layoutServiceSpy.state.helpSidebarVisible = false;
        });
        layoutServiceSpy.config = {
            ripple: false,
            inputStyle: 'outlined',
            menuMode: 'static',
            colorScheme: 'light',
            theme: 'indigo',
            scale: 14,
            menuTheme: 'colorScheme',
        };
        layoutServiceSpy.state = {
            staticMenuDesktopInactive: false,
            overlayMenuActive: false,
            profileSidebarVisible: false,
            configSidebarVisible: false,
            helpSidebarVisible: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
            sidebarActive: false,
            anchored: false,
        };
        layoutServiceSpy.overlayOpen$ = new Subject<void>().asObservable();

        menuServiceSpy = {
            reset: jasmine.createSpy('reset')
        };

        rendererSpy = {
            listen: jasmine.createSpy('listen').and.returnValue(() => undefined)
        };

        routerStub = {
            events: navigationEvents$.asObservable(),
            routerState: {
                snapshot: {
                    root: createRouteSnapshotChain({}, {}, { helpSidebar: HELP_SIDEBAR_CONTENT.default })
                }
            }
        } as unknown as Router;

        authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['logout']);

        sessionServiceSpy = jasmine.createSpyObj<SessionService>('SessionService', ['extendSession']);
        Object.defineProperty(sessionServiceSpy, 'sessionWarning$', {
            value: sessionWarning$.asObservable(),
            configurable: true
        });
    });

    function createComponent(): AppLayoutComponent {
        return new AppLayoutComponent(
            menuServiceSpy as any,
            layoutServiceSpy,
            rendererSpy as any,
            routerStub,
            authServiceSpy,
            sessionServiceSpy
        );
    }

    it('uses the deepest route help content on initialization', () => {
        (routerStub.routerState.snapshot as any).root = createRouteSnapshotChain(
            {},
            { helpSidebar: HELP_SIDEBAR_CONTENT.default },
            { helpSidebar: HELP_SIDEBAR_CONTENT.conference }
        );

        const component = createComponent();

        expect(component.currentHelpContent).toBe(HELP_SIDEBAR_CONTENT.conference);
    });

    it('falls back to default help content when the route has no help metadata', () => {
        (routerStub.routerState.snapshot as any).root = createRouteSnapshotChain({}, {}, {});

        const component = createComponent();

        expect(component.currentHelpContent).toBe(HELP_SIDEBAR_CONTENT.default);
    });

    it('closes the help sidebar and refreshes the content on navigation', () => {
        const component = createComponent();
        layoutServiceSpy.state.helpSidebarVisible = true;
        (routerStub.routerState.snapshot as any).root = createRouteSnapshotChain(
            {},
            { helpSidebar: HELP_SIDEBAR_CONTENT.default },
            { helpSidebar: HELP_SIDEBAR_CONTENT.reservation }
        );

        emitNavigation('/reservation');

        expect(layoutServiceSpy.hideHelpSidebar).toHaveBeenCalled();
        expect(layoutServiceSpy.state.helpSidebarVisible).toBeFalse();
        expect(component.currentHelpContent).toBe(HELP_SIDEBAR_CONTENT.reservation);
        expect(menuServiceSpy.reset).toHaveBeenCalled();
    });

    it('stops reacting to navigation after destruction', () => {
        const component = createComponent();

        component.ngOnDestroy();
        layoutServiceSpy.hideHelpSidebar.calls.reset();

        (routerStub.routerState.snapshot as any).root = createRouteSnapshotChain(
            {},
            { helpSidebar: HELP_SIDEBAR_CONTENT.guest }
        );
        emitNavigation('/guest');

        expect(layoutServiceSpy.hideHelpSidebar).not.toHaveBeenCalled();
        expect(component.currentHelpContent).toBe(HELP_SIDEBAR_CONTENT.default);
    });
});
