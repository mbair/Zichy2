import { Injectable } from '@angular/core';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';

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

    constructor(private apiService: ApiService) { }


    getActivities(): any[] {
        return this.activities;
    }

    addActivity(activity: any): void {
        this.activities.push(activity);
    }

    getInformation() {
        this.apiService.get<ApiResponse>(`dashboard/getinformations`)
            .subscribe({
                next: (response: ApiResponse) => {
                    // console.log('getinformations', response)
                },
                error: (error: any) => {
                }
            })
    }
}
