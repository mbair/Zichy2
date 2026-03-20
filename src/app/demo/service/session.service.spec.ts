import { of } from 'rxjs';
import { SessionService, SessionWarningState } from './session.service';
import { UserService } from './user.service';

describe('SessionService', () => {
    let service: SessionService;
    let routerSpy: jasmine.SpyObj<any> & { url: string };
    let userServiceSpy: jasmine.SpyObj<UserService>;
    let injectorStub: { get: jasmine.Spy };
    let clockInstalled = false;

    function setActiveSession(expiresInMs: number): void {
        localStorage.setItem('token', 'test-token');
        localStorage.setItem('session_expires_at', String(Date.now() + expiresInMs));
    }

    beforeEach(() => {
        localStorage.clear();

        routerSpy = jasmine.createSpyObj('Router', ['navigate', 'parseUrl']) as jasmine.SpyObj<any> & { url: string };
        routerSpy.url = '/conference';
        routerSpy.navigate.and.returnValue(Promise.resolve(true));
        routerSpy.parseUrl.and.returnValue({ queryParams: {} });

        userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['refreshSession$', 'updateUserRole']);
        userServiceSpy.refreshSession$.and.returnValue(of({}));

        injectorStub = {
            get: jasmine.createSpy('get').and.returnValue(userServiceSpy)
        };

        service = new SessionService(document, routerSpy as any, injectorStub as any);
    });

    afterEach(() => {
        if (clockInstalled) {
            jasmine.clock().uninstall();
            clockInstalled = false;
        }
        localStorage.clear();
    });

    it('treats input-oriented DOM events as user activity', () => {
        const activityEvents = (service as any).activityEvents as string[];

        expect(activityEvents).toContain('input');
        expect(activityEvents).toContain('change');
        expect(activityEvents).toContain('focusin');
    });

    it('refreshes the session on activity when expiry is near', () => {
        setActiveSession(4 * 60 * 1000);

        (service as any).activityListener();

        expect(userServiceSpy.refreshSession$).toHaveBeenCalledTimes(1);
    });

    it('shows the warning starting 5 minutes before expiry', () => {
        jasmine.clock().install();
        clockInstalled = true;
        jasmine.clock().mockDate(new Date('2026-03-20T10:00:00Z'));

        let latestWarningState: SessionWarningState = {
            visible: false,
            remainingMs: 0,
            refreshing: false,
            error: null
        };

        service.sessionWarning$.subscribe((state) => {
            latestWarningState = state;
        });

        setActiveSession(6 * 60 * 1000);
        (service as any).ensureSessionValidity();

        jasmine.clock().tick(59 * 1000);
        expect(latestWarningState.visible).toBeFalse();

        jasmine.clock().tick(1000);
        expect(latestWarningState.visible).toBeTrue();
        expect(latestWarningState.remainingMs).toBeLessThanOrEqual(5 * 60 * 1000);
    });

    it('stores the current route for post-login redirect when the session expires', () => {
        setActiveSession(-1000);

        (service as any).ensureSessionValidity();

        expect(service.peekPostLoginRedirectUrl()).toBe('/conference');
        expect(routerSpy.navigate).toHaveBeenCalledWith(
            ['/auth/login'],
            { queryParams: { reason: 'session-expired' } }
        );
    });

    it('does not refresh the session on activity when expiry is not near', () => {
        setActiveSession(10 * 60 * 1000);

        (service as any).activityListener();

        expect(userServiceSpy.refreshSession$).not.toHaveBeenCalled();
    });

    it('throttles repeated activity-triggered refresh attempts', () => {
        jasmine.clock().install();
        clockInstalled = true;
        jasmine.clock().mockDate(new Date('2026-03-20T10:00:00Z'));
        setActiveSession(4 * 60 * 1000);

        (service as any).activityListener();
        (service as any).activityListener();
        jasmine.clock().tick(29 * 1000);
        (service as any).activityListener();

        expect(userServiceSpy.refreshSession$).toHaveBeenCalledTimes(1);

        jasmine.clock().tick(1000);
        (service as any).activityListener();

        expect(userServiceSpy.refreshSession$).toHaveBeenCalledTimes(2);
    });

    it('resets the idle timer when activity is detected', () => {
        jasmine.clock().install();
        clockInstalled = true;
        jasmine.clock().mockDate(new Date('2026-03-20T10:00:00Z'));
        setActiveSession(60 * 60 * 1000);

        (service as any).ensureSessionValidity();
        jasmine.clock().tick(29 * 60 * 1000);
        expect(routerSpy.navigate).not.toHaveBeenCalled();

        (service as any).activityListener();
        jasmine.clock().tick(2 * 60 * 1000);
        expect(routerSpy.navigate).not.toHaveBeenCalled();

        jasmine.clock().tick(28 * 60 * 1000 + 1);

        expect(routerSpy.navigate).toHaveBeenCalledWith(
            ['/auth/login'],
            { queryParams: { reason: 'session-idle' } }
        );
    });
});
