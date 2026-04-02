import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageHintService {

    private readonly pageHintSubject = new BehaviorSubject<string | null>(null);

    readonly pageHint$ = this.pageHintSubject.asObservable();

    setHint(message: string | null): void {
        this.pageHintSubject.next(message);
    }

    clear(): void {
        this.pageHintSubject.next(null);
    }
}
