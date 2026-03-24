import { DOCUMENT } from "@angular/common";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

const CSRF_COOKIE_NAME = 'nfc_csrf';
const CSRF_HEADER_NAME = 'X-CSRF-Token';
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        if (SAFE_METHODS.has(req.method) || !this.isApiRequest(req.url) || req.headers.has(CSRF_HEADER_NAME)) {
            return next.handle(req)
        }

        const csrfToken = this.getCookie(CSRF_COOKIE_NAME)
        if (!csrfToken) {
            return next.handle(req)
        }

        return next.handle(req.clone({
            headers: req.headers.set(CSRF_HEADER_NAME, csrfToken)
        }))
    }

    private isApiRequest(url: string): boolean {
        return url.startsWith('/api') || url.includes('/api/')
    }

    private getCookie(name: string): string | null {
        const cookies = this.document.cookie ? this.document.cookie.split(';') : []
        const prefix = `${name}=`

        for (const entry of cookies) {
            const normalized = entry.trim()
            if (normalized.startsWith(prefix)) {
                return decodeURIComponent(normalized.slice(prefix.length))
            }
        }

        return null
    }
}
