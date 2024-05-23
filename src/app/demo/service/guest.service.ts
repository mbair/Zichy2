import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Vendeg } from '../api/vendeg';
import { Response } from '../api/ApiResponse';


@Injectable({
    providedIn: 'root',
})


export class GuestService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private guestData$: BehaviorSubject<Response | null>;
    private serviceMessage$: BehaviorSubject<any>;

    constructor(private apiService: ApiService) {
        this.guestData$ = new BehaviorSubject<Response | null>(null);
        this.serviceMessage$ = new BehaviorSubject<any>(null);
    }

    public get guestObs(): Observable<Response | null> {
        return this.guestData$.asObservable();
    }

    public get serviceMessageObs(): Observable<any> {
        return this.serviceMessage$.asObservable()
    }

    public getGuests(page: number, rowsPerPage: number, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<Response>(`guest/get/${pageSort !== '' ? 0 : page}/${rowsPerPage}${pageSort}`)
        .subscribe({
            next: (response: Response) => {
                this.guestData$.next(response);
            },
            error: (error: any) => {
                this.serviceMessage$.next(error);
            }
        });
    }

    public getGuestsBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<Response>(`guest/search/${globalFilter}${pageSort}`)
        .subscribe({
            next: (response: Response) => {
                this.guestData$.next(response);
            },
            error: (error: any) => {
                this.serviceMessage$.next(error);
            }
        });
    }

    public getGuestsBySearchQuery(filters: string): void {
        
        this.apiService.get<Response>(`guest/searchquery?${filters}`)
        .subscribe({
            next: (response: Response) => {
                this.guestData$.next(response);
            },
            error: (error: any) => {
                this.serviceMessage$.next(error);
            }
        });
    }

    public getByRFID(rfid: string): Observable<any> {
        return this.apiService.get(`/guest/getbyrfid/${rfid}`);
    }

    public updateGuest(modifiedGuest: Vendeg): void {
        this.apiService.put(`/guest/update/${modifiedGuest.id}`, modifiedGuest)
            .subscribe({
                next: () => {
                    this.serviceMessage$.next('success');
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error);
                }
            });
    }


    public updateGuest2(modifiedGuest: Vendeg): Observable<any> {
        return this.apiService.put(`/guest/update/${modifiedGuest.id}`, modifiedGuest)
            .pipe(
                tap(() => console.log(`updated guest id=${modifiedGuest.id}`)),
                catchError(this.handleError<any>('updateGuest2'))
            );
    }

    public deleteGuest(guest: Vendeg): void {
        this.apiService.delete(`/guest/delete/${guest.id}`)
            .subscribe({
                next: (response: any) => {
                    this.serviceMessage$.next(response);
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error);
                }
            });
    }

    public deleteGuests(guests: Vendeg[]): void {
        const params = { ids: guests.map(guest => guest.id) };

        this.apiService.post('/guest/bulkdelete', params)
            .subscribe({
                next: (response: any) => {
                    this.serviceMessage$.next(response);
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error);
                }
            });
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
