import { Inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    public apiURL: string;  // Path to the backend API
    public hostname: string;
    public productionURL = 'https://nfcreserve.hu'
    public developmentURL = 'https://test.nfcreserve.hu'

    constructor(@Inject(DOCUMENT) private document: any, private http: HttpClient) {
        // API URL starts with "test." when App is in Dev or in Test
        this.hostname = this.document.location.hostname;
        if (isDevMode() || this.hostname == 'test.nfcreserve.hu') {
            this.apiURL = `${this.developmentURL}/api`
        } else {
            this.apiURL = `${this.productionURL}/api`
        }
    }

    get<T>(endpoint: string, options?: { params?: any }): Observable<T> {
        const url = `${this.apiURL}/${endpoint}`;

        // Erős típus: observe response, params opcionális
        const httpOptions: {
            observe: 'response';
            params?: any;
        } = {
            observe: 'response'
        };

        if (options?.params) {
            httpOptions.params = options.params;
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

    post<T>(endpoint: string, body: any): Observable<T> {
        const isFormData = body instanceof FormData;
        const options: {
            headers?: HttpHeaders;
            observe: 'response';
            responseType: 'json'
        } = {
            observe: 'response',
            responseType: 'json'
        }

        // Csak akkor állítsuk be a 'Content-Type' fejlécet, ha nem FormData típust küldünk
        if (!isFormData) {
            options.headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        }

        return this.http.post<T>(`${this.apiURL}/${endpoint}`, body, options)
            .pipe(
                tap(response => this.refreshToken(response)),
                map(response => response.body as T),
                catchError(this.handleError))
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.apiURL}/${endpoint}`, body, { observe: 'response' })
            .pipe(
                tap(response => this.refreshToken(response)),
                map(response => response.body as T),
                catchError(this.handleError))
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.apiURL}/${endpoint}`, { observe: 'response' })
            .pipe(
                tap(response => this.refreshToken(response)),
                map(response => response.body as T),
                catchError(this.handleError))
    }

    private refreshToken(response: any) {
        const token = response.headers.get('Authorization')
        if (token) localStorage.setItem("token", token)
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(() => error)
    }
}
