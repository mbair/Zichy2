import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Reservation } from '../api/reservation';
import { Conference } from '../api/conference';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})

export class ReservationService {

    public apiURL: string
    private cache: Reservation[] = []
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService, private http: HttpClient, private translate: TranslateService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get reservationObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get reservations
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

        this.apiService.get<ApiResponse>(`reservation/get/${url}`)
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
     * Get reservations by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`reservation/search/${globalFilter}${pageSort}`)
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
     * Get reservations by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`reservation/searchquery?${filters}`)
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
     * Reservation create
     * @param reservation
     */
    public create(reservation: Reservation): void {
        this.apiService.post(`reservation/create/`, reservation)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba rögzítés',
                        detail: `${reservation.id} számú szoba rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Reservation update
     * @param reservation
     */
    public update(modifiedReservation: Reservation): void {
        this.apiService.put(`reservation/update/${modifiedReservation.id}`, modifiedReservation)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba módosítás',
                        detail: `${modifiedReservation.id} számú szoba módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Reservation delete
     * @param reservation
     */
    public delete(reservation: Reservation): void {
        this.apiService.delete(`reservation/delete/${reservation.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba törlés',
                        detail: `${reservation.id} számú szoba törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of reservations
     * @param reservations
     */
    public bulkdelete(reservations: Reservation[]): void {
        let params = {
            ids: reservations.map(reservation => reservation.id)
        }
        this.apiService.post(`reservation/bulkdelete`, params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba törlés',
                        detail: `${reservations.length} szoba törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get reservations for selector
     * @returns
     */
    getReservationsForSelector(): Observable<Reservation[]> {
        // Check if there is already cached data
        if (this.cache.length > 0) {
            return of(this.cache)
        }

        this.get(0, 999, { sortField: 'reservationNum', sortOrder: 1 }, '')
        return this.data$.asObservable().pipe(
            map((data: any) => {
                // Store reservations in cache
                const reservations = data ? data.rows : []
                this.cache = reservations

                return reservations
            })
        )
    }

    // TODO: NOT USED
    getReservationTypeByCode(code: string, beds: number) {

        let reservationTypes = [
            { 
                code: 'KB', // Kastély Bunked (emeleteságyas)
                beds: 4,
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.4-BED-ROOM'), 
                value: 'Kastély szállás 4 ágyas szoba', 
                color: 'teal' 
            },
            { 
                code: 'KB', // Kastély Bunked (emeleteságyas)
                beds: 6,
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.6-BED-ROOM'), 
                value: 'Kastély szállás 6 ágyas szoba', 
                color: 'teal' 
            },
            { 
                code: 'KB', // Kastély Bunked (emeleteságyas)
                beds: 8,
                label: this.translate.instant('ROOMTYPES.CASTLE'), 
                description: this.translate.instant('ROOMTYPES.8-BED-ROOM'), 
                value: 'Kastély szállás 8 ágyas szoba', 
                color: 'teal' 
            },
            { 
                code: 'MD', // Maranatha Double (kétágyas)
                beds: 2,
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.2-BED-ROOM'), 
                value: 'Maranatha Panzióház 2 ágyas szoba (külön fürdős)', 
                color: 'yellow' 
            },
            { 
                code: 'MQ', // Maranatha Queenbed (franciaágyas)
                beds: 2,
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.DOUBLE-BED-ROOM'), 
                value: 'Maranatha Panzióház franciaágyas szoba (külön fürdős)', 
                color: 'yellow' 
            },
            { 
                code: 'MB', // Maranatha Bunkbed (négyágyas emeleteságyas)
                beds: 4,
                label: this.translate.instant('ROOMTYPES.MARANATHA-PENSION-HOUSE'), 
                description: this.translate.instant('ROOMTYPES.M-4-BED-ROOM'), 
                value: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)', 
                color: 'yellow' 
            },
            { 
                code: 'A', // Apartman
                label: this.translate.instant('ROOMTYPES.FAMILY-ROOM'), 
                description: this.translate.instant('ROOMTYPES.WITH-KITCHEN'), 
                value: 'Családi szoba (közös konyhával, fürdővel és nappalival)', 
                color: 'orange' 
            },
        ]

        let reservationType = reservationTypes.find(reservationType => 
            reservationType.code === code && 
            (reservationType.beds === undefined || reservationType.beds === beds)
        )

        return reservationType


        
    }
}
