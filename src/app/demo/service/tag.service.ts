import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tag } from 'src/app/demo/api/tag';

@Injectable({
    providedIn: 'root',
})
export class TagService {

    constructor(private http: HttpClient) { }

    getTags() {
        return this.http.get<any>('assets/demo/data/tags.json')
            .toPromise()
            .then(res => res.data as Tag[])
            .then(data => data)
    }
}
