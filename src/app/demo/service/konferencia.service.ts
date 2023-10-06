import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Konferencia } from '../api/konferencia';

@Injectable()
export class KonferenciaService {

    constructor(private http: HttpClient) { }

    getKonferenciak() {
        return this.http.get<any>('assets/demo/data/konferenciak.json')
            .toPromise()
            .then(res => res.data as Konferencia[])
            .then(data => data);
    }
}
