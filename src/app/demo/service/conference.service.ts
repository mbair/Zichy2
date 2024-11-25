import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Conference } from '../api/conference';
import { Question } from '../api/question';

@Injectable({
    providedIn: 'root',
})

export class ConferenceService {

    public apiURL: string
    private cache: Conference[] = []
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get conferenceObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get conferences
     * @param page
     * @param rowsPerPage
     * @param sort
     * @param queryParams
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

        this.apiService.get<ApiResponse>(`conference/get/${url}`)
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
     * Get conferences by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`conference/search/${globalFilter}${pageSort}`)
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
     * Get conferences by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`conference/searchquery?${filters}`)
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
     * Conference create
     * @param conference
     */
    public create(conference: Conference): void {
        this.apiService.post(`conference/create/`, conference)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres konferencia rögzítés',
                        detail: `${conference.name} rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Conference update
     * @param conference
     */
    public update(modifiedConference: Conference): void {
        this.apiService.put(`conference/update/${modifiedConference.id}`, modifiedConference)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres konferencia módosítás',
                        detail: `${modifiedConference.name} módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Conference delete
     * @param conference
     */
    public delete(conference: Conference): void {
        this.apiService.delete(`conference/delete/${conference.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres konferencia törlés',
                        detail: `${conference.name} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of conferences
     * @param conferences
     */
    public bulkdelete(conferences: Conference[]): void {
        let params = {
            ids: conferences.map(conference => conference.id)
        }
        this.apiService.post('conference/bulkdelete', params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres konferencia törlés',
                        detail: `${conferences.length} konferencia törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get conferences for selector
     * @returns
     */
    getConferencesForSelector(): Observable<Conference[]> {
        // Check if there is already cached data
        if (this.cache.length > 0) {
            return of(this.cache)
        }

        this.get(0, 999, { sortField: 'id', sortOrder: 1 }, '')
        return this.data$.asObservable().pipe(
            map((data: any) => {
                // Store conferences in cache
                const conferences = data ? data.rows : []
                this.cache = conferences

                return conferences
            })
        )
    }

    /**
     * Conference SLUG validator
     * @param slug 
     * @returns 
     */
    public isSlugValid(slug: string): Observable<boolean> {
        this.get(0, 20, 'slug=', 'sort')

        // Figyeljük a data$ stream-et, hogy van-e találat
        return this.data$.pipe(
            map((response: any) => {
                console.log('isSlugValid response', response)
                // Ellenőrzés: ha van adat és az adatok nem üresek, akkor érvényes a slug
                return response && response.data && response.rows.length > 0;
            }),
            catchError(() => of(false)) // Hibakezelés: ha hiba történik, érvénytelen a slug
        )
    }
}
