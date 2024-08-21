import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { io, Socket } from 'socket.io-client';


@Injectable({
    providedIn: 'root',
})

export class FoodCounterWebSocket {

    private socket: Socket;
    private connectionStatus = new BehaviorSubject<boolean>(false)

    constructor(apiService: ApiService) {
        this.socket = io(apiService.apiURL)

        this.socket.on('connect', () => {
            console.log('FoodCounterWebSocket connected')
            this.connectionStatus.next(true)
        })

        this.socket.on('disconnect', () => {
            console.error('FoodCounterWebSocket disconnected')
            this.connectionStatus.next(false)
            this.reconnect()
        })

        this.socket.on('connect_error', (error: any) => {
            console.error('FoodCounterWebSocket connection error:', error)
            this.connectionStatus.next(false)
        })
    }

    private reconnect() {
        setTimeout(() => {
            console.log('Attempting to reconnect...')
            this.socket.connect()
        }, 1000)
    }

    getConnectionStatus(): Observable<boolean> {
        return this.connectionStatus.asObservable()
    }

    joinRoom(dinerType: string) {
        console.log(dinerType, '-------')
        this.socket.emit('join-room', dinerType)
    }

    sendMessage(message: string) {
        this.socket.emit('mealsNumber', message)
    }

    getMealsNumber() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('mealsNumber', (data: any) => {
                observer.next(data)
            })
            return () => { this.socket.disconnect() }
        })
        return observable
    }

    getDefData() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('setDefMealsNumber', (data: any) => {
                observer.next(data)
            })
            return () => { this.socket.disconnect() }
        })
        return observable
    }

    onMessage(event: string): Observable<any> {
        return new Observable(observer => {
            this.socket.on(event, (data: any) => {
                observer.next(data)
            })

            // Leiratkozás esetén távolítsuk el az eseményfigyelőt
            return () => this.socket.off(event)
        })
    }
}
