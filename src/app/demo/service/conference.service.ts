import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Conference } from '../api/conference';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class ConferenceService {

    public apiURL: string
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    // In-memory cache for the selector list
    private selectorCache$?: Observable<any[]>;

    constructor(private apiService: ApiService, private http: HttpClient) {
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
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC'
            const sortField = sort.sortField && sort.sortField !== "" ? sort.sortField : 'beginDate'
            pageSort = `sort=${sortField}&order=${sortOrder}`;
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
    // public getConferencesForSelector(): Observable<Conference[]> {

    //     let queryParams = ''

    //     this.get(0, 999, { sortField: 'beginDate', sortOrder: 1 }, queryParams)
    //     return this.data$.asObservable().pipe(
    //         map((data: any) => {
    //             const conferences = data ? data.rows : []
    //             return conferences
    //         })
    //     )
    // }

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
    public assignRoomsToConference(conferenceId: any, roomIds: number[]): Observable<any> {
        return this.apiService.post(`conferencesroom/addroom/${conferenceId.id}`, { roomIds });
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

    /**
     * Saves custom registration form field information for a specific conference.
     * Sends the array of field info objects (including translations and display positions)
     * to the backend for the given conference ID.
     *
     * @param formFieldInfos - An object containing the conferenceId and the fields array,
     *   where each field contains the field name, translations (hu/en), and display position.
     */
    public saveFormFieldInfos(formFieldInfos: { conferenceId: number; fields: any[] }): void {
        this.apiService.post(`conference/saveFormFieldInfos/${formFieldInfos.conferenceId}`, formFieldInfos.fields)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Mező információk mentve',
                        detail: `Űrlap mező információk sikeresen mentve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Lightweight conference list for UI selectors.
     * Calls GET /api/conference/selector with optional filters.
     * Uses shareReplay(1) to cache the latest successful response.
     */
    getSelector$(opts: SelectorQuery = {}): Observable<ConferenceSelectorItem[]> {
        const params = this.buildSelectorParams(opts)
        const qs = params.toString()
        return this.apiService
            .get<ConferenceSelectorItem[]>(`conference/selector${qs ? `?${qs}` : ''}`)
            .pipe(shareReplay(1))
    }

    /** Clears the in-memory selector cache */
    clearSelectorCache(): void {
        this.selectorCache$ = undefined;
    }

    /** Build query params for the selector endpoint */
    private buildSelectorParams(opts: SelectorQuery): HttpParams {
        let p = new HttpParams();

        // enabled defaults to 1 (true) if not provided
        if (opts.enabled !== undefined) {
            const val = typeof opts.enabled === 'boolean' ? (opts.enabled ? '1' : '0') : String(opts.enabled);
            p = p.set('enabled', val);
        } else {
            p = p.set('enabled', '1');
        }

        if (opts.sort) p = p.set('sort', opts.sort);
        if (opts.order) p = p.set('order', opts.order);

        return p;
    }
}   

/** Minimal item used by the selector UI (matches the new endpoint schema) */
export interface ConferenceSelectorItem {
    id: number;
    name: string;
    beginDate: string;             // yyyy-mm-dd
    endDate: string;               // yyyy-mm-dd
    registrationEndDate?: string | null;
    enabled: boolean | 0 | 1;
}

/** Optional filters for the selector request */
export interface SelectorQuery {
    enabled?: boolean | 0 | 1;     // default true
    date_from?: string;            // yyyy-mm-dd
    date_to?: string;              // yyyy-mm-dd
    sort?: string;                 // e.g. 'beginDate'
    order?: 'ASC' | 'DESC' | 'asc' | 'desc';
    forceRefresh?: boolean;        // bypass cache if true
}