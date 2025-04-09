import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Conference } from '../api/conference';

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
        
        // Get user role & id
        const userrole = localStorage.getItem('userrole')
        const userid = localStorage.getItem('userid')

        // Organizers can only see their own conferences
        if (userrole === 'Szervezo' && userid) {
            const organizerFilter = `organizer_user_id=${userid}`
            queryParams = queryParams 
                ? `${queryParams}&${organizerFilter}` 
                : organizerFilter
        }

        // By default, only enabled=1 conferences are requested,
        // unless the queryParams specifically contains the "enabled" filter.
        if (!queryParams.includes('enabled=')) {
            queryParams = queryParams 
                ? `${queryParams}&enabled=1` 
                : 'enabled=1';
        }
        
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
    public getConferencesForSelector(): Observable<Conference[]> {
        // Check if there is already cached data
        // if (this.cache.length > 0) {
        //     return of(this.cache)
        // }

        let queryParams = ''

        this.get(0, 999, { sortField: 'beginDate', sortOrder: 1 }, queryParams)
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
     * Retrieves a conference by its unique identifier.
     * @param id - The unique identifier of the conference to retrieve.
     * @returns An Observable containing the response with the conference details.
     */
    public getById(id: number): Observable<any> {
        return this.apiService.get(`conference/getbyid/${id}`)
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

    /**
     * Assign Rooms to Conference
     * @param conferenceId 
     * @param roomIds 
     */
    public assignRoomsToConference(conferenceId: number, roomIds: number[]): void {
        this.apiService.post(`conferencesroom/addroom/${conferenceId}`, { roomIds })
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba-konferencia összerendelés',
                        detail: `Szobák hozzárendelve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Remove room assignment
     * @param conferenceId 
     * @param roomIds 
     */
    public removeRoomsFromConference(conferenceId: number, roomIds: number[]): void {
        this.apiService.post(`conferencesroom/removeroom/${conferenceId}`, { roomIds })
        .subscribe({
            next: (response: any) => {
                this.message$.next({
                    severity: 'success',
                    summary: 'Összerendelés törölve',
                    detail: `Szoba-konferencia összerendelés törölve`,
                })
            },
            error: (error: any) => {
                this.message$.next(error)
            }
        })
    }
}   
