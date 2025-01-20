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
    }
}
