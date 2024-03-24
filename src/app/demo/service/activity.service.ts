import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Szoba } from '../api/szoba';

@Injectable({
    providedIn: 'root',
})
// export class SzobaService {

//     constructor(private http: HttpClient) { }

//     getSzobak() {
//         return this.http.get<any>('assets/demo/data/szobak.json')
//             .toPromise()
//             .then(res => res.data as Szoba[])
//             .then(data => data);
//     }

// }

export class ActivityService {
    private activities: any[] = [
        { activityName: 'Bejelentkezés', userName: 'Timi', timestamp: new Date() },
        { activityName: 'Szoba hozzárendelés', userName: 'Admin', timestamp: new Date() },
        { activityName: 'Jelentkezés elutasítás', userName: 'Admin', timestamp: new Date() },
        { activityName: 'Konyhanaptár megtekintése', userName: 'Konyha admin', timestamp: new Date() },
        { activityName: 'Takaró hozzáadása', userName: 'Tak. admin', timestamp: new Date() },
    ];

    getActivities(): any[] {
        return this.activities;
    }

    addActivity(activity: any): void {
        this.activities.push(activity);
    }
}
