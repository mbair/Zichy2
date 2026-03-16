import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

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
