import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { Gender } from '../api/gender';

@Injectable({
    providedIn: 'root',
})

export class GenderService {

    private dataCache: any;
    private genderData$: BehaviorSubject<any>
    private serviceMessage$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.genderData$ = new BehaviorSubject<any>(null)
        this.serviceMessage$ = new BehaviorSubject<any>(null)
    }

    public get genderObs(): Observable<ApiResponse | null> {
        return this.genderData$.asObservable()
    }

    public get serviceMessageObs(): Observable<any> {
        return this.serviceMessage$.asObservable()
    }

    public getGenders(page: number, rowsPerPage: number, sort: any): any {

        let response = [
            { code: 1, name: 'Férfi' },
            { code: 2, name: 'Nő' },
        ]

        this.genderData$.next(response)

        // let pageSort: string = '';
        // if (sort !== '') {
        //     const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
        //     pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        // }

        // this.apiService.get<ApiResponse>(`gender/get/${pageSort !== '' ? 0 : page}/${rowsPerPage}${pageSort}`)
        //     .subscribe({
        //         next: (response: ApiResponse) => {
        //             this.dataCache = response.rows ? response.rows : null;
        //             this.genderData$.next(response)
        //         },
        //         error: (error: any) => {
        //             this.serviceMessage$.next(error)
        //         }
        //     })
    }
}
