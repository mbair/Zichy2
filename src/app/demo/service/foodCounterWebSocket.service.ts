import { Inject, Injectable, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';


@Injectable({
    providedIn: 'root',
})

export class FoodCounterWebSocket {

    private socket = io('http://localhost:3011/');
    public  apiURL: string;  // Path to the backend API
    private hostname: string;
    private productionURL = 'https://nfcreserve.hu/api'
    private developmentURL = 'https://test.nfcreserve.hu/api'

    constructor(@Inject(DOCUMENT) private document: any, private http: HttpClient) {
        // API URL starts with "test." when App is in Dev or in Test
        this.hostname = this.document.location.hostname;
        if (isDevMode() || this.hostname == 'test.nfcreserve.hu') {
            this.apiURL = this.developmentURL
        } else {
            this.apiURL = this.productionURL
        }
    }

    joinRoom(dinerType: string) {
        this.socket.emit('join-room', dinerType);
    }

    sendMessage(message: string) {
        this.socket.emit('message', message);
    }

    getMealsNumber() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('mealsNumber', (data: any) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }

    getDefData() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('setDefMealsNumber', (data: any) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
}
