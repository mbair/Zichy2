import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})


export class TagService {

    private tagData$: BehaviorSubject<any>

    constructor(private http: HttpClient) {
        this.tagData$ = new BehaviorSubject<any>(null)
    }

    public get guestObs(): Observable<any> {
        return this.tagData$.asObservable()
    }

    public getTags():void {
        this.http.get('https://nfcreserve.hu/api/rfid/get/0/9999', {
            observe: 'response',
            responseType: 'json'
        })
        .subscribe({
            next: (response: any) => {
                let rows = response.body.rows;
                rows.forEach((row: { identifier: any; rfid: any }) => {
                    row.identifier = row.rfid
                })
                this.tagData$.next(response.body)
            },
            error: (error: any) => {
                this.tagData$.next(error)
            }
        })
    }

    assignTag(guestId: any, identifier: any) {
        const body = { "rfid": identifier };
        return this.http.put<any>('https://nfcreserve.hu/api/guest/update/' + guestId, body)
            .toPromise()
            .then(res => {
                return res
            })
    }
}
