import { Inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    public  apiURL: string;  // Path to the backend API
    private hostname: string;
    private productionURL = 'https://nfcreserve.hu/api'
    private developmentURL = 'https://test.nfcreserve.hu/api'

    constructor(@Inject(DOCUMENT) private document: any, private http: HttpClient) {
        // API URL starts with "test." when App is in Dev or in Test
        this.hostname = this.document.location.hostname;
        if (isDevMode() || this.hostname == 'test.nfcreserve.hu') {
            this.apiURL = this.developmentURL
        } else {
            this.apiURL = this.productionURL
        }
    }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.apiURL}/${endpoint}`, { observe: 'response' }) // { observe: 'response' } gives back everything, not only the req.body
            .pipe(
                tap(response => this.refreshToken(response)),
                map(response => response.body as T),
                catchError(this.handleError))
    }

    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.apiURL}/${endpoint}`, body, { observe: 'response' })
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
        console.error('An error occurred:', error.message);
        return throwError('ERROR')
    }
}
