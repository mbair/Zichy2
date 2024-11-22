import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Room } from '../api/room';

@Injectable({
    providedIn: 'root',
})

export class RoomService {

    public apiURL: string
    private cache: Room[] = []
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get roomObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get rooms
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

        this.apiService.get<ApiResponse>(`room/get/${url}`)
            .subscribe({
                next: (response: ApiResponse) => {

                    // Room name need convert to lowercase
                    if (response && response.rows) {
                        response.rows.map((room: any) => {
                            room.name = room.name?.toLowerCase()
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
     * Get rooms by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`room/search/${globalFilter}${pageSort}`)
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
     * Get rooms by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`room/searchquery?${filters}`)
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
     * Room create
     * @param room
     */
    public create(room: Room): void {
        this.apiService.post(`room/create/`, room)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba rögzítés',
                        detail: `${room.roomNum} rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Room update
     * @param room
     */
    public update(modifiedRoom: Room): void {
        this.apiService.put(`room/update/${modifiedRoom.id}`, modifiedRoom)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba módosítás',
                        detail: `${modifiedRoom.roomNum} módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Room delete
     * @param room
     */
    public delete(room: Room): void {
        this.apiService.delete(`room/delete/${room.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba törlés',
                        detail: `${room.roomNum} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of rooms
     * @param rooms
     */
    public bulkdelete(rooms: Room[]): void {
        let params = {
            ids: rooms.map(room => room.id)
        }
        this.apiService.post(`room/bulkdelete`, params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szoba törlés',
                        detail: `${rooms.length} szoba törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get rooms for selector
     * @returns
     */
    getRoomsForSelector(): Observable<Room[]> {
        // Check if there is already cached data
        if (this.cache.length > 0) {
            return of(this.cache)
        }

        this.get(0, 999, { sortField: 'id', sortOrder: 1 }, '')
        return this.data$.asObservable().pipe(
            map((data: any) => {
                // Store rooms in cache
                const rooms = data ? data.rows : []
                this.cache = rooms

                return rooms
            })
        )
    }
}
