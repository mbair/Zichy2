import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../service/session.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('ErrorInterceptor status', error.status)

                // Unauthorized
                if (error.status === 401 && this.shouldHandleUnauthorized(req.url)) {
                    this.sessionService.handleUnauthorized()
                }

                // IMPORTANT: rethrow the original HttpErrorResponse
                return throwError(() => error)
            })
        )
    }

    private shouldHandleUnauthorized(url: string): boolean {
        if (url.includes('/users/login') || url.includes('/users/forgotpassrequest/')) {
            return false
        }

        return this.sessionService.hasActiveSessionSnapshot()
    }
}
