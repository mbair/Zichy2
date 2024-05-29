import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Diet } from '../api/diet';

@Injectable({
    providedIn: 'root',
})

export class DietService {

    private dataCache: any;
    private dietData$: BehaviorSubject<any>
    private serviceMessage$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.dietData$ = new BehaviorSubject<any>(null)
        this.serviceMessage$ = new BehaviorSubject<any>(null)
    }

    public get dietObs(): Observable<ApiResponse | null> {
        return this.dietData$.asObservable()
    }

    public get serviceMessageObs(): Observable<any> {
        return this.serviceMessage$.asObservable()
    }

    public getDiets(page: number, rowsPerPage: number, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`diet/get/${pageSort !== '' ? 0 : page}/${rowsPerPage}${pageSort}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.dataCache = response.rows ? response.rows : null;
                    this.dietData$.next(response)
                },
                error: (error: any) => {
                    this.serviceMessage$.next(error)
                }
            })
    }

    /**
     * Get Diet color by diet name
     * We are using PrimeNG colors as default
     * @return color as string
     */
    public getDietColor(dietName: string): string {
        return this.dataCache.map((diet: Diet) => {
            if (dietName.toLowerCase() == diet.name?.toLowerCase()) {
                return diet.color
            }
            return ''
        })

        // switch (diet) {
        //     case 'tejmentes':
        //         return 'blue-400';
        //     case 'laktózmentes':
        //         return 'blue-400'
        //     case 'gluténmentes':
        //         return 'yellow-300'
        //     case 'glutén-, laktóz-, tejmentes':
        //         return 'red-500'
        //     case 'vegetáriánus':
        //         return 'teal-500'
        //     case 'nem kér étkezést':
        //         return 'gray-300'
        //     default:
        //         return 'gray-700'
        // }
    }
}
