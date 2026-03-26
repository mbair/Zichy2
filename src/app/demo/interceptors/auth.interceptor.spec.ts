import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
    function createNextSpy() {
        const next = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);
        next.handle.and.returnValue(of(new HttpResponse({ status: 200 })));
        return next;
    }

    it('adds the CSRF header to unsafe api requests when the csrf cookie is present', () => {
        const interceptor = new AuthInterceptor({
            cookie: 'nfc_csrf=test-csrf-token'
        } as Document);
        const next = createNextSpy();
        const request = new HttpRequest('POST', '/api/users/logout', {});

        interceptor.intercept(request, next).subscribe();

        const forwardedRequest = next.handle.calls.mostRecent().args[0] as HttpRequest<unknown>;
        expect(forwardedRequest.headers.get('X-CSRF-Token')).toBe('test-csrf-token');
    });

    it('does not add the CSRF header to safe requests', () => {
        const interceptor = new AuthInterceptor({
            cookie: 'nfc_csrf=test-csrf-token'
        } as Document);
        const next = createNextSpy();
        const request = new HttpRequest('GET', '/api/users/getowndata');

        interceptor.intercept(request, next).subscribe();

        const forwardedRequest = next.handle.calls.mostRecent().args[0] as HttpRequest<unknown>;
        expect(forwardedRequest.headers.has('X-CSRF-Token')).toBeFalse();
    });
});
