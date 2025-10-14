import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Room, RoomFilter } from '../api/room';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})

export class RoomService {

    public apiURL: string
    private cache: Room[] = []
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService, private http: HttpClient, private translate: TranslateService) {
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

    public getBySearchQuery$(filters: string) {
        return this.apiService.get<ApiResponse>(`room/searchquery?${filters}`)
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
                        detail: `${room.roomNum} számú szoba rögzítve`,
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
                        detail: `${modifiedRoom.roomNum} számú szoba módosítva`,
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
                        detail: `${room.roomNum} számú szoba törölve`,
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

        this.get(0, 999, { sortField: 'roomNum', sortOrder: 1 }, '')
        return this.data$.asObservable().pipe(
            map((data: any) => {
                // Store rooms in cache
                const rooms = data ? data.rows : []
                this.cache = rooms

                return rooms
            })
        )
    }

    searchRoomsForSelector$(filter: RoomFilter = {}) {
        return this.getBySearchQuery$(this.buildRoomQS(filter))
            .pipe(map((data: any) => data ? (data.rows ?? []) : []))
    }

    private buildRoomQS(f: RoomFilter = {}): string {
        const parts: string[] = [];

        // Prefer 'conferenceId' (backended mindkettőt érti, de ez tisztább)
        if (f.conferenceId != null) parts.push(`conferenceId=${encodeURIComponent(String(f.conferenceId))}`);

        if (f.building) {
            const arr = Array.isArray(f.building) ? f.building : [f.building];
            parts.push(`building=${arr.map(encodeURIComponent).join(',')}`);
        }
        if (typeof f.minBeds === 'number') parts.push(`minBeds=${f.minBeds}`);
        if (typeof f.climate === 'boolean') parts.push(`climate=${f.climate ? 1 : 0}`);
        if (f.enabled) parts.push(`enabled=1`);

        // >>> NEW flags <<<
        if (f.onlyNotReserved) parts.push(`onlyNotReserved=true`);
        if (f.includeRoomIds?.length) parts.push(`includeRoomIds=${f.includeRoomIds.join(',')}`);

        return parts.join('&');
    }

    // TODO: NOT USED
    getRoomTypeByCode(code: string, beds: number) {

        let roomTypes = [
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

        let roomType = roomTypes.find(roomType =>
            roomType.code === code &&
            (roomType.beds === undefined || roomType.beds === beds)
        )

        return roomType



    }
}
