import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LogService } from 'src/app/demo/service/log.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionService } from 'src/app/demo/service/session.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;
    let layoutServiceStub: { config: { theme: string }; onConfigUpdate: jasmine.Spy };
    let logServiceSpy: jasmine.SpyObj<LogService>;
    let sessionServiceSpy: jasmine.SpyObj<SessionService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let activatedRouteStub: ActivatedRoute;

    function createComponent(reason?: string): LoginComponent {
        activatedRouteStub = {
            snapshot: {
                queryParamMap: {
                    get: (key: string) => key === 'reason' ? (reason ?? null) : null
                }
            }
        } as unknown as ActivatedRoute;

        return new LoginComponent(
            new FormBuilder(),
            authServiceSpy,
            messageServiceSpy,
            layoutServiceStub as any,
            logServiceSpy,
            sessionServiceSpy,
            activatedRouteStub,
            routerSpy
        );
    }

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
        authServiceSpy.login.and.returnValue(of({} as any));

        messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', ['add', 'clear']);
        layoutServiceStub = {
            config: { theme: 'indigo' },
            onConfigUpdate: jasmine.createSpy('onConfigUpdate')
        };
        logServiceSpy = jasmine.createSpyObj<LogService>('LogService', ['create']);
        sessionServiceSpy = jasmine.createSpyObj<SessionService>('SessionService', ['peekPostLoginRedirectUrl', 'consumePostLoginRedirectUrl']);
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);
        routerSpy.navigate.and.returnValue(Promise.resolve(true));
        routerSpy.navigateByUrl.and.returnValue(Promise.resolve(true));
    });

    it('shows a clearer session-expired message when a return route is available', () => {
        sessionServiceSpy.peekPostLoginRedirectUrl.and.returnValue('/conference');

        createComponent('session-expired');

        expect(messageServiceSpy.add).toHaveBeenCalledWith(jasmine.objectContaining({
            severity: 'warn',
            summary: 'A munkamenet lejárt',
            detail: jasmine.stringContaining('visszairányítjuk az előző oldalra')
        }));
    });

    it('navigates back to the stored page after a successful login', () => {
        sessionServiceSpy.peekPostLoginRedirectUrl.and.returnValue('/conference');
        sessionServiceSpy.consumePostLoginRedirectUrl.and.returnValue('/conference?filter=active');
        const component = createComponent();

        component.loginForm.setValue({
            email: 'teszt@example.com',
            password: 'secret'
        });

        component.login();

        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/conference?filter=active');
        expect(routerSpy.navigate).not.toHaveBeenCalledWith(['']);
    });
});
