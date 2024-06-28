import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { io } from 'socket.io-client';


@Injectable({
    providedIn: 'root',
})

export class FoodCounterWebSocket {

    private socket: any;

    constructor(apiService: ApiService) {
        this.socket = io(apiService.apiURL)
    }

    joinRoom(dinerType: string) {
        console.log(dinerType,'-------')
        this.socket.emit('join-room', dinerType);
    }

    sendMessage(message: string) {
        this.socket.emit('mealsNumber', message);
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
