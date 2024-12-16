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
    private data$: BehaviorSubject<any>
    private createdGuest$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.createdGuest$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get guestObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get createdGuestObs(): Observable<ApiResponse | null> {
        return this.createdGuest$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get guests
     * @param page
     * @param rowsPerPage
     * @param sort
     */
    public get(page: number, rowsPerPage: number, sort: any, queryParams: string): void {
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
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get guests by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`guest/search/${globalFilter}${pageSort}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get guests by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`guest/searchquery?${filters}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Retrieves guests associated with a specific conference name.
     * @param conferenceName - The name of the conference to search guests for.
     * @returns An Observable containing the response with the list of guests.
     */
    public getByConferenceName(conferenceName: string): Observable<any> {
        // return this.apiService.get(`guest/getbyconferancename/${conferenceName}`) // TODO: typo in backend
        return this.apiService.get(`guest/searchquery?conferenceName=${conferenceName}`)
    }

    /**
     * Get a guest by RFID identifier
     * @param rfid
     * @returns An Observable containing the response with the guest information
     */
    public getByRFID(rfid: string): Observable<any> {
        return this.apiService.get(`guest/getbyrfid/${rfid}`)
    }

    /**
     * Updates the last tag usage of the guest identified by the given id.
     * @param guestId The id of the guest to update the last tag usage for.
     */
    public updateLastTagUsage(guestId: string | undefined): void {
        this.apiService.get<ApiResponse>(`guest/updatelasttagusage/${guestId}`)
            .subscribe({
                next: (response: ApiResponse) => { },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Guest create
     * @param guest
     * @param files
     */
    public create(guest: Guest, files: File[]): void {

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
                    this.message$.next('success')
                    // this.message$.next({
                    //     severity: 'success',
                    //     summary: 'Sikeres vendég rögzítés',
                    //     detail: `${response.lastName} ${response.firstName} rögzítve`,
                    // })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Guest update
     * @param guest
     */
    public update(modifiedGuest: Guest): void {
        this.apiService.put(`guest/update/${modifiedGuest.id}`, modifiedGuest)
            .subscribe({
                next: () => {
                    this.message$.next('success')
                    // this.message$.next({
                    //     severity: 'success',
                    //     summary: 'Sikeres vendég módosítás',
                    //     detail: `${response.lastName} ${response.firstName} rögzítve`,
                    // })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    public updateGuest2(modifiedGuest: Guest): Observable<any> {
        return this.apiService.put(`guest/update/${modifiedGuest.id}`, modifiedGuest)
            .pipe(
                tap(() => console.log(`updated guest id=${modifiedGuest.id}`)),
                catchError(this.handleError<any>('updateGuest2'))
            )
    }

    /**
     * Guest delete
     * @param guest
     */
    public delete(guest: Guest): void {
        this.apiService.delete(`guest/delete/${guest.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres vendég törlés',
                        detail: `${guest.lastName} ${guest.firstName} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of guests
     * @param guests
     */
    public bulkdelete(guests: Guest[]): void {
        let params = {
            ids: guests.map(guest => guest.id)
        }
        this.apiService.post(`guest/bulkdelete`, params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres vendég törlés',
                        detail: `${guests.length} vendég törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
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
