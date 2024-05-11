import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Log } from '../api/log';

@Injectable({
    providedIn: 'root',
})


export class LogService {

    private API = 'https://nfcreserve.hu/api/bedtype' // TODO: Temporary we use BEDTYPE for LOGs
    private logData$: BehaviorSubject<any>
    private serviceMessage$: BehaviorSubject<any>

    constructor(private http: HttpClient) {
        this.logData$ = new BehaviorSubject<any>(null)
        this.serviceMessage$ = new BehaviorSubject<any>(null)
    }

    public get logObs(): Observable<any> {
        return this.logData$.asObservable()
    }

    public get serviceMessageObs(): Observable<any> {
        return this.serviceMessage$.asObservable()
    }

    public getLogs(): void {
        this.http.get(this.API + '/get/0/9999', {
            observe: 'response',
            responseType: 'json'
        })
        .subscribe({
            next: (response: any) => {
                this.logData$.next(response.body.rows)
            },
            error: (error: any) => {
                this.serviceMessage$.next(error)
            }
        })
    }

    public createLog(log: Log): void {
        this.http.post(this.API + '/create/', log, {
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

    public updateLog(modifiedLog: Log): void {
        this.http.put(this.API + '/update/' + modifiedLog.id, modifiedLog, {
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

    public deleteLog(log: Log): void {
        this.http.delete(this.API + '/delete/' + log.id, {
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
