import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Guest } from '../api/guest';

@Injectable({
    providedIn: 'root',
})


export class GuestService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private API = 'https://nfcreserve.hu/api/guest'
    private guestData$: BehaviorSubject<any>
    private serviceMessage$: BehaviorSubject<any>

    constructor(private http: HttpClient) {
        this.guestData$ = new BehaviorSubject<any>(null)

        this.serviceMessage$ = new BehaviorSubject<any>(null)
    }

    public get guestObs(): Observable<any> {
        return this.guestData$.asObservable()
    }

    public get serviceMessageObs(): Observable<any> {
        return this.serviceMessage$.asObservable()
    }

    public getGuests(): void {
        this.http.get(this.API + '/get/0/9999', {
            observe: 'response',
            responseType: 'json'
        })
            .subscribe({
                next: (response: any) => {
                    this.guestData$.next(response.body.rows)
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public getByRFID(rfid: string): Observable<any> {
        return this.http.get(`${this.API}/getbyrfid/${rfid}`);
    }

    public updateGuest(modifiedGuest: Guest): void {
        this.http.put(this.API + '/update/' + modifiedGuest.id, modifiedGuest, {
            observe: 'response',
            responseType: 'json'
        })
            .subscribe({
                next: (response: any) => {
                    this.serviceMessage$.next('success')
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public updateGuest2(modifiedGuest: Guest): Observable<any> {
        return this.http.put(this.API + '/update/' + modifiedGuest.id, modifiedGuest, this.httpOptions).pipe(
            tap(_ => console.log(`updated guest id=${modifiedGuest.id}`)),
            catchError(this.handleError<any>('updateGuest2'))
        )
    }

    public deleteGuest(guest: Guest): void {
        this.http.delete(this.API + '/delete/' + guest.id, {
            observe: 'response',
            responseType: 'json'
        })
            .subscribe({
                next: (response: any) => {
                    this.serviceMessage$.next(response)
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public deleteGuests(guests: Guest[]): void {
        let params = {
            ids: guests.map(guest => guest.id)
        }

        const req = new HttpRequest(
            'POST',
            this.API + '/bulkdelete',
            params,
            { responseType: 'json' }
        )

        this.http.request(req)
            .subscribe({
                next: (response: any) => {
                    this.serviceMessage$.next(response)
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.error(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }
}
