import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

type SessionEndReason = 'manual' | 'expired' | 'unauthorized';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private readonly tokenStorageKey = 'token';
    private readonly sessionExpiryStorageKey = 'session_expires_at';
    private readonly sessionExpiryHeader = 'X-Session-Expires-At';
    private expirationTimer: ReturnType<typeof setTimeout> | null = null;
    private monitoringInitialized = false;
    private logoutInProgress = false;

    private readonly storageListener = (event: StorageEvent) => {
        if (!event.key || ![this.tokenStorageKey, this.sessionExpiryStorageKey].includes(event.key)) {
            return;
        }

        if (!this.getToken()) {
            this.cancelExpirationTimer();
            this.getUserService().updateUserRole('No Role');
            this.redirectToLogin('session-invalid');
            return;
        }

        this.ensureSessionValidity();
    };

    private readonly focusListener = () => {
        this.ensureSessionValidity();
    };

    private readonly visibilityListener = () => {
        if (this.document.visibilityState === 'visible') {
            this.ensureSessionValidity();
        }
    };

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private injector: Injector
    ) { }

    initializeMonitoring(): void {
        if (this.monitoringInitialized) {
            return;
        }

        this.monitoringInitialized = true;
        window.addEventListener('storage', this.storageListener);
        window.addEventListener('focus', this.focusListener);
        this.document.addEventListener('visibilitychange', this.visibilityListener);

        this.ensureSessionValidity();
    }

    updateSessionFromResponse(response: { headers: { get(name: string): string | null } }): void {
        const token = response.headers.get('Authorization');
        const expiresAt = this.parseExpiry(response.headers.get(this.sessionExpiryHeader));

        if (token) {
            localStorage.setItem(this.tokenStorageKey, token);
        }

        if (expiresAt !== null) {
            localStorage.setItem(this.sessionExpiryStorageKey, String(expiresAt));
        }

        this.ensureSessionValidity();
    }

    isSessionActive(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        const expiresAt = this.getStoredExpiry();
        if (expiresAt !== null && Date.now() >= expiresAt) {
            this.endSession('expired');
            return false;
        }

        return true;
    }

    logout(): void {
        this.endSession('manual');
    }

    handleUnauthorized(): void {
        this.endSession('unauthorized');
    }

    private ensureSessionValidity(): void {
        const token = this.getToken();
        if (!token) {
            this.cancelExpirationTimer();
            return;
        }

        const expiresAt = this.getStoredExpiry();
        if (expiresAt === null) {
            this.cancelExpirationTimer();
            return;
        }

        const delay = expiresAt - Date.now();
        if (delay <= 0) {
            this.endSession('expired');
            return;
        }

        this.scheduleExpirationTimer(delay);
    }

    private scheduleExpirationTimer(delay: number): void {
        this.cancelExpirationTimer();
        this.expirationTimer = setTimeout(() => {
            this.endSession('expired');
        }, delay);
    }

    private cancelExpirationTimer(): void {
        if (this.expirationTimer !== null) {
            clearTimeout(this.expirationTimer);
            this.expirationTimer = null;
        }
    }

    private endSession(reason: SessionEndReason): void {
        if (this.logoutInProgress) {
            return;
        }

        this.logoutInProgress = true;
        this.cancelExpirationTimer();

        localStorage.removeItem('email');
        localStorage.removeItem('fullname');
        localStorage.removeItem('phone');
        localStorage.removeItem(this.tokenStorageKey);
        localStorage.removeItem(this.sessionExpiryStorageKey);
        localStorage.removeItem('user_rolesid');
        localStorage.removeItem('userid');
        localStorage.removeItem('userrole');

        this.getUserService().updateUserRole('No Role');
        this.redirectToLogin(this.getRedirectReason(reason));

        queueMicrotask(() => {
            this.logoutInProgress = false;
        });
    }

    private redirectToLogin(reason?: string): void {
        const targetUrl = this.router.url.startsWith('/auth/login') ? this.router.url : '';
        const currentReason = this.router.parseUrl(this.router.url).queryParams['reason'];

        if (targetUrl.startsWith('/auth/login') && currentReason === reason) {
            return;
        }

        void this.router.navigate(
            ['/auth/login'],
            reason ? { queryParams: { reason } } : undefined
        );
    }

    private getRedirectReason(reason: SessionEndReason): string | undefined {
        if (reason === 'manual') {
            return undefined;
        }

        return reason === 'expired' ? 'session-expired' : 'session-invalid';
    }

    private getToken(): string | null {
        return localStorage.getItem(this.tokenStorageKey);
    }

    private getStoredExpiry(): number | null {
        return this.parseExpiry(localStorage.getItem(this.sessionExpiryStorageKey));
    }

    private parseExpiry(value: string | null): number | null {
        if (!value) {
            return null;
        }

        const expiresAt = Number(value);
        return Number.isFinite(expiresAt) ? expiresAt : null;
    }

    private getUserService(): UserService {
        return this.injector.get(UserService);
    }
}
