import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Conference } from '../api/conference';

@Injectable({
    providedIn: 'root',
})

export class ConferenceService {

    public apiURL: string
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

    public get(page: number, rowsPerPage: number, sort: any, queryParams: string): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        const query = pageSort !== '' && queryParams !== '' ? pageSort + "&" + queryParams :
            pageSort !== '' && queryParams === '' ? pageSort :
                pageSort === '' && queryParams !== '' ? queryParams : '';
        const url = `${pageSort !== '' ? 0 : page}/${rowsPerPage}${query !== '' ? "?" + query : ''}`;
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

    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`conference/search/${globalFilter}${pageSort}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.data$.next(response);
                },
                error: (error: any) => {
                    this.message$.next(error);
                }
            });
    }

    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`conference/searchquery?${filters}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.data$.next(response);
                },
                error: (error: any) => {
                    this.message$.next(error);
                }
            });
    }

    public create(conference: Conference): void {
        this.apiService.post(`conference/create/`, conference)
            .subscribe({
                next: (response: any) => {
                    this.message$.next('success')
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    public update(modifiedConference: Conference): void {
        this.apiService.put(`conference/update/${modifiedConference.id}`, modifiedConference)
            .subscribe({
                next: () => {
                    this.message$.next('success')
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    public update2(modifiedConference: Conference): Observable<any> {
        return this.apiService.put(`conference/update/${modifiedConference.id}`, modifiedConference)
            .pipe(
                tap(() => console.log(`updated conference id=${modifiedConference.id}`)),
                catchError(this.handleError<any>('updateConference2'))
            )
    }

    public delete(conference: Conference): void {
        this.apiService.delete(`conference/delete/${conference.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    public bulkdelete(conferences: Conference[]): void {
        let params = {
            ids: conferences.map(conference => conference.id)
        }
        this.apiService.post('conference/bulkdelete', params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres törlés',
                        detail: 'Konferenciák törölve',
                        life: 3000
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
