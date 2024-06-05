import { Inject, Injectable, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';


@Injectable({
    providedIn: 'root',
})

export class FoodCounterWebSocket {
  
    private developmentURL = 'https://test.nfcreserve.hu/api'
    private socket = io(this.developmentURL)
    

    joinRoom(dinerType: string) {
        console.log(dinerType,'-------')
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
