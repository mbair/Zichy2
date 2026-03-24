import { Inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    public apiURL: string;  // Path to the backend API
    public hostname: string;
    public productionURL = 'https://nfcreserve.hu'
    public developmentURL = 'https://test.nfcreserve.hu'

    constructor(
        @Inject(DOCUMENT) private document: any,
        private http: HttpClient,
        private sessionService: SessionService
    ) {
        // In local ng serve use relative /api so Angular dev-server proxy can avoid CORS.
        this.hostname = this.document.location.hostname;
        if (isDevMode()) {
            this.apiURL = '/api'
        } else if (this.hostname == 'test.nfcreserve.hu') {
            this.apiURL = `${this.developmentURL}/api`
        } else {
            this.apiURL = `${this.productionURL}/api`
        }
    }

    get<T>(endpoint: string, options?: { params?: any; headers?: HttpHeaders; withCredentials?: boolean }): Observable<T> {
        const url = `${this.apiURL}/${endpoint}`;

        // Erős típus: observe response, params opcionális
        const httpOptions: {
            observe: 'response';
            params?: any;
            headers?: HttpHeaders;
            withCredentials?: boolean;
        } = {
            observe: 'response',
            withCredentials: true
        };

        if (options?.params) {
            httpOptions.params = options.params;
        }

        if (options?.headers) {
            httpOptions.headers = options.headers;
        }

        if (options?.withCredentials !== undefined) {
            httpOptions.withCredentials = options.withCredentials;
        }

        // A get<T>(…, httpOptions) most Observable<HttpResponse<T>>-t ad vissza
        return this.http.get<T>(url, httpOptions)
            .pipe(
                // explicit HttpResponse<T> típus
                tap((response: HttpResponse<T>) => this.refreshToken(response)),
                map((response: HttpResponse<T>) => {
                    // itt már biztos, hogy van .body
                    return response.body as T;
                }),
                catchError(this.handleError)
            );
    }

    post<T>(endpoint: string, body: any, options?: { withCredentials?: boolean }): Observable<T> {
        const isFormData = body instanceof FormData;
        const requestOptions: {
            headers?: HttpHeaders;
            observe: 'response';
            responseType: 'json'
            withCredentials?: boolean;
        } = {
            observe: 'response',
            responseType: 'json',
            withCredentials: true
        }

        // Csak akkor állítsuk be a 'Content-Type' fejlécet, ha nem FormData típust küldünk
        if (!isFormData) {
            requestOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        }

        if (options?.withCredentials !== undefined) {
            requestOptions.withCredentials = options.withCredentials
        }

        return this.http.post<T>(`${this.apiURL}/${endpoint}`, body, requestOptions)
            .pipe(
                tap(response => this.refreshToken(response)),
                map(response => response.body as T),
                catchError(this.handleError))
    }

    put<T>(endpoint: string, body: any, options?: { withCredentials?: boolean }): Observable<T> {
        return this.http.put<T>(`${this.apiURL}/${endpoint}`, body, {
            observe: 'response',
            withCredentials: options?.withCredentials ?? true
        })
            .pipe(
                tap(response => this.refreshToken(response)),
                map(response => response.body as T),
                catchError(this.handleError))
    }

    delete<T>(endpoint: string, options?: { withCredentials?: boolean }): Observable<T> {
        return this.http.delete<T>(`${this.apiURL}/${endpoint}`, {
            observe: 'response',
            withCredentials: options?.withCredentials ?? true
        })
            .pipe(
                tap(response => this.refreshToken(response)),
                map(response => response.body as T),
                catchError(this.handleError))
    }

    private refreshToken(response: any) {
        this.sessionService.updateSessionFromResponse(response)
    }

    private handleError(error: HttpErrorResponse) {
        const isAuthError = error.status === 401 || error.status === 403
        if (!isAuthError) {
            console.error('An error occurred:', error);
        }
        return throwError(() => error)
    }
}
