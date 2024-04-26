import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vendeg } from '../api/vendeg';

@Injectable({
    providedIn: 'root',
})


export class GuestService {

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

    public updateGuest(modifiedGuest: Vendeg, guests: Vendeg[]): void {
        this.http.put(this.API + '/update/' + modifiedGuest.id, modifiedGuest, {
            observe: 'response',
            responseType: 'json'
        })
            .subscribe({
                next: (response: any) => {
                    // Deep Copy of Guests
                    let guestsClone = JSON.parse(JSON.stringify(guests))

                    // Replace with modified element
                    guestsClone.forEach((guest: Vendeg, index: number) => {
                        if (guest.id === modifiedGuest.id) {
                            guestsClone[index] = modifiedGuest;
                        }
                    })
                    this.guestData$.next(guestsClone)
                    this.serviceMessage$.next('success')
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public deleteGuest(guest: Vendeg): void {
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
}
