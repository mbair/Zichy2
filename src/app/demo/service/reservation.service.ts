import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Reservation } from '../api/reservation';

@Injectable({ providedIn: 'root' })
export class ReservationService {
    public apiURL: string;
    private cache: Reservation[] = []

    private message$ = new BehaviorSubject<any>(null)
    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
    }

    get$(page: number, rowsPerPage: number, sort: { sortField: string; sortOrder: 1 | -1 } | '', queryParams: string): Observable<ApiResponse> {
        let pageSort = ''
        if (sort !== '') {
            const order = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField ? `sort=${sort.sortField}&order=${order}` : ''
        }
        const query = pageSort && queryParams ? `${pageSort}&${queryParams}` : (pageSort || queryParams || '')
        return this.apiService.get<ApiResponse>(`reservation/get/${page}/${rowsPerPage}${query ? `?${query}` : ''}`)
    }

    getBySearch$(globalFilter: string, sort: { sortField: string; sortOrder: 1 | -1 } | ''): Observable<ApiResponse> {
        let pageSort = ''
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField !== '' ? `?sort=${sort.sortField}&order=${sortOrder}` : ''
        }
        return this.apiService.get<ApiResponse>(`reservation/search/${globalFilter}${pageSort}`)
    }

    getBySearchQuery$(filters: string): Observable<ApiResponse> {
        return this.apiService.get<ApiResponse>(`reservation/searchquery?${filters}`)
    }

    // For Selectors (dont write to common stream)
    getReservationsForSelector(): Observable<Reservation[]> {
        if (this.cache.length) return of(this.cache)
        return this.apiService
            .get<ApiResponse>('reservation/get/0/999?sort=reservationNum&order=ASC')
            .pipe(
                map(res => res?.rows ?? []),
                tap(rows => { this.cache = rows })
            )
    }

    // CRUD
    create(reservation: Reservation): void {
        this.apiService.post(`reservation/create/`, reservation)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba rögzítés',
                        detail: `${reservation.id} számú szoba rögzítve`,
                    });
                },
                error: (error: any) => this.message$.next(error)
            });
    }

    update(modifiedReservation: Reservation): void {
        this.apiService.put(`reservation/update/${modifiedReservation.id}`, modifiedReservation)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba módosítás',
                        detail: `${modifiedReservation.id} számú szoba módosítva`,
                    });
                },
                error: (error: any) => this.message$.next(error)
            });
    }

    delete(reservation: Reservation): void {
        this.apiService.delete(`reservation/delete/${reservation.id}`)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba törlés',
                        detail: `${reservation.id} számú szoba törölve`,
                    });
                },
                error: (error: any) => this.message$.next(error)
            });
    }

    bulkdelete(reservations: Reservation[]): void {
        const params = { ids: reservations.map(r => r.id) };
        this.apiService.post(`reservation/bulkdelete`, params)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba törlés',
                        detail: `${reservations.length} szoba törölve`,
                    });
                },
                error: (error: any) => this.message$.next(error)
            });
    }
}
