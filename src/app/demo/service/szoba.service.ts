import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Szoba } from '../api/szoba';

@Injectable({
    providedIn: 'root',
})
export class SzobaService {

    constructor(private http: HttpClient) { }

    getSzobak() {
        return this.http.get<any>('assets/demo/data/szobak.json')
            .toPromise()
            .then(res => res.data as Szoba[])
            .then(data => data);
    }

}
