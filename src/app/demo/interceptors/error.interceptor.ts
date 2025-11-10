import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('ErrorInterceptor status', error.status)

                // Unauthorized
                if (error.status === 401) {
                     this.router.navigate(['/auth/login'])
                }

                // Log whatever you want here, but DO NOT return a string
                // (Keep backend body so downstream can read error.error.message)
                const backendMsg =
                    (error?.error && typeof error.error === 'object' && (error.error as any).message)
                        ? (error.error as any).message
                        : (typeof error?.error === 'string' ? error.error : error.message);

                // IMPORTANT: rethrow the original HttpErrorResponse
                return throwError(() => error)
            })
        )
    }
}
