import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ApiService } from './api.service';

export interface GuestEatingEvent {
    lastName: string;
    firstName: string;
    diet: string;
    mealType: string;
    timestamp: Date;
    birthDate?: string | null;
}

const FEED_MAX = 7;

@Injectable({
    providedIn: 'root',
})
export class LiveDiningService implements OnDestroy {

    private socket: Socket;
    private readonly guestEatingSubject = new Subject<GuestEatingEvent>();
    private readonly feedSubject = new BehaviorSubject<GuestEatingEvent[]>([]);
    readonly guestEatingEvents$ = this.guestEatingSubject.asObservable();
    readonly feed$ = this.feedSubject.asObservable();

    private readonly handleConnect = () => {
        this.socket.emit('join-room', 'dashboard');
    };

    private readonly handleGuestEating = (data: GuestEatingEvent) => {
        const normalizedEvent = this.normalizeEvent(data);
        this.pushEvent(normalizedEvent);
        this.guestEatingSubject.next(normalizedEvent);
    };

    get feed(): ReadonlyArray<GuestEatingEvent> {
        return this.feedSubject.value;
    }

    constructor(apiService: ApiService) {
        this.socket = io(apiService.apiURL);
        this.socket.on('connect', this.handleConnect);
        this.socket.on('guestEating', this.handleGuestEating);
    }

    getGuestEatingEvents(): Observable<GuestEatingEvent> {
        return this.guestEatingEvents$;
    }

    addLocalEvent(event: GuestEatingEvent): void {
        const normalizedEvent = this.normalizeEvent(event);
        this.pushEvent(normalizedEvent);
        this.guestEatingSubject.next(normalizedEvent);
    }

    private pushEvent(event: GuestEatingEvent): void {
        this.feedSubject.next([event, ...this.feedSubject.value].slice(0, FEED_MAX));
    }

    private normalizeEvent(event: GuestEatingEvent): GuestEatingEvent {
        return {
            ...event,
            timestamp: event.timestamp instanceof Date ? event.timestamp : new Date(event.timestamp),
            diet: event.diet || '',
            mealType: event.mealType || '',
            birthDate: event.birthDate || null,
        };
    }

    ngOnDestroy() {
        this.socket.off('connect', this.handleConnect);
        this.socket.off('guestEating', this.handleGuestEating);
        this.socket.disconnect();
        this.guestEatingSubject.complete();
        this.feedSubject.complete();
    }
}
