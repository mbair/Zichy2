import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diet } from '../api/diet';

@Injectable({
    providedIn: 'root',
})
export class DietService {

    constructor(private http: HttpClient) { }

    getSzobak() {
        return this.http.get<any>('assets/demo/data/diet.json')
            .toPromise()
            .then(res => res.data as Diet[])
            .then(data => data)
    }

}
