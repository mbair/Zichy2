import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tag } from 'src/app/demo/api/tag';

@Injectable({
    providedIn: 'root',
})
export class TagService {

    constructor(private http: HttpClient) { }

    // getTags() {
    //     return this.http.get<any>('assets/demo/data/tags.json')
    //         .toPromise()
    //         .then(res => res.data as Tag[])
    //         .then(data => data)
    // }


    getTags() {
        // TODO: HTTPS needed
        return this.http.get<any>('http://h112-75.rackhostvps.com:881/api/rfid/get/0/500')
            .toPromise()
            .then(res => {
                let rows = res.rows;
                rows.forEach((row: { identifier: any; rfid: any; }) => {
                   row.identifier = row.rfid
                });
                return res.rows
            })
            // .then(data => data)
    }
}
