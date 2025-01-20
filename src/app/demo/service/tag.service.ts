import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Tag } from '../api/tag';

@Injectable({
    providedIn: 'root',
})

export class TagService {

    public apiURL: string
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get tagObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get tags
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

        this.apiService.get<ApiResponse>(`rfid/get/${url}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    // TODO: Do this on backend
                    let rows = response.rows;
                    if (rows && rows.length > 0){
                        rows.forEach((row: { identifier: any; rfid: any }) => {
                            row.identifier = row.rfid
                        })
                    }
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get tags by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`rfid/search/${globalFilter}${pageSort}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    // TODO: Do this on backend
                    let rows = response.rows;
                    if (rows && rows.length > 0){
                        rows.forEach((row: { identifier: any; rfid: any }) => {
                            row.identifier = row.rfid
                        })
                    }
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get tags by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`rfid/searchquery?${filters}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    // TODO: Do this on backend
                    let rows = response.rows;
                    if (rows && rows.length > 0){
                        rows.forEach((row: { identifier: any; rfid: any }) => {
                            row.identifier = row.rfid
                        })
                    }
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Tag create
     * @param tag
     */
    public create(tag: Tag): void {
        this.apiService.post(`rfid/create/`, tag)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres címke rögzítés',
                        detail: `${tag.rfid} rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Tag update
     * @param tag
     */
    public update(modifiedTag: Tag): void {
        this.apiService.put(`rfid/update/${modifiedTag.id}`, modifiedTag)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres címke módosítás',
                        detail: `${modifiedTag.rfid} módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Tag delete
     * @param tag
     */
    public delete(tag: Tag): void {
        this.apiService.delete(`rfid/delete/${tag.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres címke törlés',
                        detail: `${tag.rfid} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of tags
     * @param tags
     */
    public bulkdelete(tags: Tag[]): void {
        let params = {
            ids: tags.map(tag => tag.id)
        }
        this.apiService.post('rfid/bulkdelete', params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres címke törlés',
                        detail: `${tags.length} címke törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get Tag by RFID identifier
     * @param rfid
     */
    public getByRFID(rfid: string): Observable<any> {
        return this.apiService.get(`rfid/search/${rfid}`)
    }
}
