import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Diet } from '../api/diet';

@Injectable({
    providedIn: 'root',
})

export class DietService {

    public apiURL: string
    private cache: Diet[] = []
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get dietObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get diets
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

        this.apiService.get<ApiResponse>(`diet/get/${url}`)
            .subscribe({
                next: (response: ApiResponse) => {

                    // Diet name need convert to lowercase
                    if (response && response.rows) {
                        response.rows.map((diet: any) => {
                            diet.name = diet.name?.toLowerCase()
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
     * Get diets by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`diet/search/${globalFilter}${pageSort}`)
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
     * Get diets by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`diet/searchquery?${filters}`)
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
     * Diet create
     * @param diet
     */
    public create(diet: Diet): void {
        this.apiService.post(`diet/create/`, diet)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres étrend rögzítés',
                        detail: `${diet.name} rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Diet update
     * @param diet
     */
    public update(modifiedDiet: Diet): void {
        this.apiService.put(`diet/update/${modifiedDiet.id}`, modifiedDiet)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres étrend módosítás',
                        detail: `${modifiedDiet.name} módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Diet delete
     * @param diet
     */
    public delete(diet: Diet): void {
        this.apiService.delete(`diet/delete/${diet.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres étrend törlés',
                        detail: `${diet.name} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of diets
     * @param diets
     */
    public bulkdelete(diets: Diet[]): void {
        let params = {
            ids: diets.map(diet => diet.id)
        }
        this.apiService.post(`diet/bulkdelete`, params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres étrend törlés',
                        detail: `${diets.length} étrend törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get diets for selector
     * @returns
     */
    getDietsForSelector(): Observable<Diet[]> {
        // Check if there is already cached data
        if (this.cache.length > 0) {
            return of(this.cache)
        }

        this.get(0, 999, { sortField: 'id', sortOrder: 1 }, '')
        return this.data$.asObservable().pipe(
            map((data: any) => {
                // Store diets in cache
                const diets = data ? data.rows : []
                this.cache = diets

                return diets
            })
        )
    }

    /**
     * Get Diet color by diet name
     * We are using PrimeNG colors as default
     * @return diet color as string
     */
    public getDietColor(dietName: string): string {
        let dietColor: string = ''
        this.cache.map((diet: Diet) => {
            if (dietName?.toLowerCase() == diet.name?.toLowerCase()) {
                dietColor = diet.color ?? ''
            }
        })
        return dietColor
    }
}
