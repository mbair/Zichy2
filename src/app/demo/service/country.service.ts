import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries(): Observable<any[]> {
        return this.http.get<any>('assets/demo/data/countries.json')
            .pipe(
                map(res => res.data as any[])
            )
    }
}
