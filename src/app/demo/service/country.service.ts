import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Country {
    name: string;
    huname: string;
    hunationality: string;
    nationality: string;
    code: string;
}

@Injectable({
    providedIn: 'root',
})

export class CountryService {

    private countries: Country[] | null = null  // Countries cache

    constructor(private http: HttpClient) {}

    getCountries(): Observable<Country[]> {
        // Return datas from cache
        if (this.countries) {
            return of(this.countries)
        } else {
            return this.http.get<{ data: Country[] }>('assets/demo/data/countries.json')
                .pipe(
                    map(res => res.data),
                    catchError(() => of([])),
                    map(data => {
                        // Store datas in cache
                        this.countries = data
                        return data
                    })
                )
        }
    }

        // getHuNationality(nationality: string): string | null {
    //     const country = this.countries.find(c => c.code === nationality)
    //     return country ? country.hunationality : null
    // }

    // getHuCountry(country: string): string | null {
    //     const hucountry = this.countries.find(c => c.name === country)
    //     return hucountry ? hucountry.huname : null
    // }

    getHuNationality(nationality: string): string | null {
        const country = this.countries?.find(c => c.code === nationality)
        return country ? country.hunationality : null
    }

    getHuCountryName(country: string): string | null {
        const hucountry = this.countries?.find(c => c.name === country)
        return hucountry ? hucountry.huname : null
    }
}
