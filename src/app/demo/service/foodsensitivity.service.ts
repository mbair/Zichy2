import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodSensitivity } from '../api/food-sensitivity';

@Injectable({
    providedIn: 'root',
})
export class FoodSensitivityService {

    constructor(private http: HttpClient) { }

    getFoodSensitivities() {
        return this.http.get<any>('assets/demo/data/foodsensitivities.json')
            .toPromise()
            .then(res => res.data as FoodSensitivity[])
            .then(data => data)
    }
}
