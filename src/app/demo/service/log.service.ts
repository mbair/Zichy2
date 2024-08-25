import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Log } from '../api/log';

@Injectable({
    providedIn: 'root',
})

export class LogService {

    public apiURL: string
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get logObs(): Observable<any> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get logs
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

        this.apiService.get<ApiResponse>(`logs/get/${url}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    if (response && response.rows?.length) {
                        response.rows.forEach(row => {

                            // OK
                            if (row.status == 200) {
                                let response_data = JSON.parse(row.response_data),
                                message = response_data.message

                                if (message) {
                                    row.response_data = message
                                }
                            }

                            // Successful create
                            if (row.status == 201) {
                                let message = `${row.table_name} created successfully`
                                message = message.charAt(0).toUpperCase() + message.slice(1)
                                row.response_data = message
                            }

                            // Bad Request
                            if (row.status == 400) {
                                let response_data = JSON.parse(row.response_data),
                                    error = response_data.error,
                                    message = response_data.message;

                                if (message) row.response_data = message
                                if (error) row.original_data = JSON.stringify(error)
                            }
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
     * Get logs by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`logs/search/${globalFilter}${pageSort}`)
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
     * Get logs by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`logs/searchquery?${filters}`)
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
     * Log create
     * @param log
     */
    public create(log: Log): void {
        this.apiService.post(`logs/create/`, log)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres log rögzítés',
                        detail: `Log rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Log update
     * @param log
     */
    public update(modifiedLog: Log): void {
        this.apiService.put(`logs/update/${modifiedLog.id}`, modifiedLog)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres log módosítás',
                        detail: `Log módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Log delete
     * @param log
     */
    public delete(log: Log): void {
        this.apiService.delete(`logs/delete/${log.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres log törlés',
                        detail: `Log törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of logs
     * @param logs
     */
    public bulkdelete(logs: Log[]): void {
        let params = {
            ids: logs.map(log => log.id)
        }
        this.apiService.post('logs/bulkdelete', params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres log törlés',
                        detail: `${logs.length} log törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }
}
