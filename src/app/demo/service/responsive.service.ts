import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})

export class ResponsiveService {
    
    private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth <= 768)
    isMobile$ = this.isMobileSubject.asObservable()

    constructor() {
        this.updateIsMobile()
        window.addEventListener('resize', () => this.updateIsMobile())
    }

    private updateIsMobile() {
        const isMobile = window.innerWidth <= 768
        this.isMobileSubject.next(isMobile)
    }

    getIsMobile(): boolean {
        return this.isMobileSubject.value
    }
}
