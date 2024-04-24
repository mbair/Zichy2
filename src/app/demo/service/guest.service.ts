import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})


export class GuestService {

    private guestData$: BehaviorSubject<any>

    constructor(private http: HttpClient) {
        this.guestData$ = new BehaviorSubject<any>(null)
    }

    public get guestObs(): Observable<any> {
        return this.guestData$.asObservable()
    }

    public getGuests():void {
        this.http.get('https://nfcreserve.hu/api/guest/get/0/9999', {
            observe: 'response',
            responseType: 'json'
        })
        .subscribe({
            next: (response: any) => {
                console.log('guestService', response)
                this.guestData$.next(response.body)
            },
            error: (error: any) => {
                this.guestData$.next(error)
            }
        })
    }
}
