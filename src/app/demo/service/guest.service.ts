import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Guest } from '../api/guest';

@Injectable({
    providedIn: 'root',
})

export class GuestService {

    public apiURL: string
    private guestData$: BehaviorSubject<any>
    private createdGuest$: BehaviorSubject<any>
    private serviceMessage$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.guestData$ = new BehaviorSubject<any>(null)
        this.createdGuest$ = new BehaviorSubject<any>(null)
        this.serviceMessage$ = new BehaviorSubject<any>(null)
    }

    public get guestObs(): Observable<ApiResponse | null> {
        return this.guestData$.asObservable()
    }

    public get createdGuestObs(): Observable<ApiResponse | null> {
        return this.createdGuest$.asObservable()
    }

    public get serviceMessageObs(): Observable<any> {
        return this.serviceMessage$.asObservable()
    }

    public getGuests(page: number, rowsPerPage: number, sort: any, queryParams: string): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        const query = pageSort !== '' && queryParams !== '' ? pageSort + "&" + queryParams :
            pageSort !== '' && queryParams === '' ? pageSort :
                pageSort === '' && queryParams !== '' ? queryParams : '';
        const url = `${page}/${rowsPerPage}${query !== '' ? "?" + query : ''}`;
        this.apiService.get<ApiResponse>(`guest/get/${url}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.guestData$.next(response)
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public getGuestsBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`guest/search/${globalFilter}${pageSort}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.guestData$.next(response)
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public getGuestsBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`guest/searchquery?${filters}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.guestData$.next(response)
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public getByRFID(rfid: string): Observable<any> {
        return this.apiService.get(`guest/getbyrfid/${rfid}`)
    }

    public updateLastTagUsage(guestId: string | undefined): void {
        this.apiService.get<ApiResponse>(`guest/updatelasttagusage/${guestId}`)
            .subscribe({
                next: (response: ApiResponse) => { },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public createGuest(guest: Guest, files: File[]): void {

        const formData = new FormData()
        formData.append('guest', JSON.stringify(guest))

        if (files && files.length > 0) {
            for (const file of files) {
                if (!file) return
                formData.append('idcard', file, file.name)
            }
        }        
        
        this.apiService.post(`guest/create/`, formData)
            .subscribe({
                next: (response: any) => {
                    this.createdGuest$.next(response)
                    this.serviceMessage$.next('success')
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public updateGuest(modifiedGuest: Guest): void {
        this.apiService.put(`guest/update/${modifiedGuest.id}`, modifiedGuest)
            .subscribe({
                next: () => {
                    this.serviceMessage$.next('success')
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    public updateGuest2(modifiedGuest: Guest): Observable<any> {
        return this.apiService.put(`guest/update/${modifiedGuest.id}`, modifiedGuest)
            .pipe(
                tap(() => console.log(`updated guest id=${modifiedGuest.id}`)),
                catchError(this.handleError<any>('updateGuest2'))
            );
    }

    public deleteGuest(guest: Guest): void {
        this.apiService.delete(`guest/delete/${guest.id}`)
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

        this.apiService.post('guest/bulkdelete', params)
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
            console.error(error) // log to console instead

            // TODO: better job of transforming error for user consumption
            console.error(`${operation} failed: ${error.message}`)

            // Let the app keep running by returning an empty result.
            return of(result as T)
        }
    }
}
