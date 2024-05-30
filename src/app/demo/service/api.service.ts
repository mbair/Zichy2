import { Inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    private hostname: string;
    private apiUrl: string;  // Path to the backend API
    private productionURL = 'https://nfcreserve.hu/api'
    private developmentURL = 'https://test.nfcreserve.hu/api'

    constructor(@Inject(DOCUMENT) private document: any, private http: HttpClient) {
        // API URL starts with "test." when App is in Dev or in Test
        this.hostname = this.document.location.hostname;
        console.log(this.hostname);
        if (isDevMode() || this.hostname == 'test.nfcreserve.hu') {
            this.apiUrl = this.developmentURL
        } else {
            this.apiUrl = this.productionURL
        }
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error.message);
        return throwError('Something went wrong; please try again later.')
    }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`)
            .pipe(catchError(this.handleError))
    }

    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body)
            .pipe(catchError(this.handleError))
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body)
            .pipe(catchError(this.handleError))
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${endpoint}`)
            .pipe(catchError(this.handleError))
    }
}
