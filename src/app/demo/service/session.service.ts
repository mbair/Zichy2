import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { getRemainingSessionMs, parseSessionExpiry } from '../utils/session-time.utils';
import { UserService } from './user.service';

type SessionEndReason = 'manual' | 'expired' | 'unauthorized';
type SessionRefreshMode = 'auto' | 'manual';

export interface SessionWarningState {
    readonly visible: boolean;
    readonly remainingMs: number;
    readonly refreshing: boolean;
    readonly error: string | null;
}

const INITIAL_SESSION_WARNING_STATE: SessionWarningState = {
    visible: false,
    remainingMs: 0,
    refreshing: false,
    error: null,
};

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private readonly tokenStorageKey = 'token';
    private readonly sessionExpiryStorageKey = 'session_expires_at';
    private readonly sessionExpiryHeader = 'X-Session-Expires-At';
    private readonly idleTimeoutMs = 30 * 60 * 1000;
    private readonly keepAliveBeforeExpiryMs = 5 * 60 * 1000;
    private readonly warningBeforeExpiryMs = 2 * 60 * 1000;
    private readonly activityEvents: Array<keyof DocumentEventMap> = ['click', 'keydown', 'mousedown', 'scroll', 'touchstart'];
    private expirationTimer: ReturnType<typeof setTimeout> | null = null;
    private keepAliveTimer: ReturnType<typeof setTimeout> | null = null;
    private warningTimer: ReturnType<typeof setTimeout> | null = null;
    private warningCountdownTimer: ReturnType<typeof setInterval> | null = null;
    private idleTimer: ReturnType<typeof setTimeout> | null = null;
    private monitoringInitialized = false;
    private logoutInProgress = false;
    private keepAliveInFlight = false;
    private activeWarningExpiry: number | null = null;
    private readonly sessionWarningStateSubject = new BehaviorSubject<SessionWarningState>(INITIAL_SESSION_WARNING_STATE);

    private readonly storageListener = (event: StorageEvent) => {
        if (!event.key || ![this.tokenStorageKey, this.sessionExpiryStorageKey].includes(event.key)) {
            return;
        }

        if (!this.getToken()) {
            this.cancelExpirationTimer();
            this.cancelKeepAliveTimer();
            this.cancelWarningTimer();
            this.closeSessionWarning();
            this.cancelIdleTimer();
            this.getUserService().updateUserRole('No Role');
            this.redirectToLogin('session-invalid');
            return;
        }

        this.ensureSessionValidity();
    };

    private readonly focusListener = () => {
        this.ensureSessionValidity();
    };

    private readonly activityListener = () => {
        this.resetIdleTimer();
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

    get sessionWarning$(): Observable<SessionWarningState> {
        return this.sessionWarningStateSubject.asObservable();
    }

    initializeMonitoring(): void {
        if (this.monitoringInitialized) {
            return;
        }

        this.monitoringInitialized = true;
        window.addEventListener('storage', this.storageListener);
        window.addEventListener('focus', this.focusListener);
        this.document.addEventListener('visibilitychange', this.visibilityListener);
        this.activityEvents.forEach((eventName) => {
            this.document.addEventListener(eventName, this.activityListener, true);
        });

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
        if (expiresAt === null) {
            this.endSession('unauthorized');
            return false;
        }

        if (expiresAt !== null && Date.now() >= expiresAt) {
            this.endSession('expired');
            return false;
        }

        return true;
    }

    hasActiveSessionSnapshot(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        const expiresAt = this.getStoredExpiry();
        if (expiresAt === null) {
            return false;
        }

        return Date.now() < expiresAt;
    }

    logout(reason: SessionEndReason = 'manual'): void {
        this.endSession(reason);
    }

    handleUnauthorized(): void {
        this.endSession('unauthorized');
    }

    private ensureSessionValidity(): void {
        const token = this.getToken();
        if (!token) {
            this.cancelExpirationTimer();
            this.cancelKeepAliveTimer();
            this.cancelWarningTimer();
            this.closeSessionWarning();
            this.cancelIdleTimer();
            return;
        }

        const expiresAt = this.getStoredExpiry();
        if (expiresAt === null) {
            this.endSession('unauthorized');
            return;
        }

        const delay = expiresAt - Date.now();
        if (delay <= 0) {
            this.endSession('expired');
            return;
        }

        this.scheduleExpirationTimer(delay);
        this.scheduleKeepAliveTimer(delay);
        this.scheduleWarningTimer(delay, expiresAt);
        this.resetIdleTimer();
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

    private scheduleKeepAliveTimer(delay: number): void {
        this.cancelKeepAliveTimer();

        if (delay <= 0) {
            return;
        }

        const keepAliveDelay = Math.max(delay - this.keepAliveBeforeExpiryMs, 0);
        this.keepAliveTimer = setTimeout(() => {
            this.triggerKeepAlive();
        }, keepAliveDelay);
    }

    private cancelKeepAliveTimer(): void {
        if (this.keepAliveTimer !== null) {
            clearTimeout(this.keepAliveTimer);
            this.keepAliveTimer = null;
        }
    }

    private scheduleWarningTimer(delay: number, expiresAt: number): void {
        this.cancelWarningTimer();

        const warningDelay = delay - this.warningBeforeExpiryMs;
        if (warningDelay <= 0) {
            this.openSessionWarning(expiresAt);
            return;
        }

        this.closeSessionWarning();
        this.warningTimer = setTimeout(() => {
            this.openSessionWarning(expiresAt);
        }, warningDelay);
    }

    private cancelWarningTimer(): void {
        if (this.warningTimer !== null) {
            clearTimeout(this.warningTimer);
            this.warningTimer = null;
        }
    }

    private resetIdleTimer(): void {
        if (!this.getToken() || this.getStoredExpiry() === null) {
            this.cancelIdleTimer();
            return;
        }

        this.cancelIdleTimer();
        this.idleTimer = setTimeout(() => {
            this.endSession('unauthorized', 'session-idle');
        }, this.idleTimeoutMs);
    }

    private cancelIdleTimer(): void {
        if (this.idleTimer !== null) {
            clearTimeout(this.idleTimer);
            this.idleTimer = null;
        }
    }

    private endSession(reason: SessionEndReason, redirectReason?: string): void {
        if (this.logoutInProgress) {
            return;
        }

        this.logoutInProgress = true;
        this.cancelExpirationTimer();
        this.cancelKeepAliveTimer();
        this.cancelWarningTimer();
        this.closeSessionWarning();
        this.cancelIdleTimer();
        this.keepAliveInFlight = false;

        localStorage.removeItem('email');
        localStorage.removeItem('fullname');
        localStorage.removeItem('phone');
        localStorage.removeItem(this.tokenStorageKey);
        localStorage.removeItem(this.sessionExpiryStorageKey);
        localStorage.removeItem('user_rolesid');
        localStorage.removeItem('userid');
        localStorage.removeItem('userrole');

        this.getUserService().updateUserRole('No Role');
        this.redirectToLogin(redirectReason ?? this.getRedirectReason(reason));

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
        return parseSessionExpiry(value);
    }

    private getUserService(): UserService {
        return this.injector.get(UserService);
    }

    extendSession(): void {
        if (!this.sessionWarningStateSubject.getValue().visible) {
            return;
        }

        this.requestSessionRefresh('manual');
    }

    private triggerKeepAlive(): void {
        if (this.keepAliveInFlight || this.logoutInProgress) {
            return;
        }

        if (!this.getToken() || !this.hasActiveSessionSnapshot()) {
            return;
        }

        if (this.document.visibilityState !== 'visible') {
            return;
        }

        this.requestSessionRefresh('auto');
    }

    private requestSessionRefresh(mode: SessionRefreshMode): void {
        if (this.keepAliveInFlight || this.logoutInProgress) {
            return;
        }

        if (!this.getToken() || !this.hasActiveSessionSnapshot()) {
            return;
        }

        const previousExpiry = this.getStoredExpiry();
        this.keepAliveInFlight = true;

        if (mode === 'manual') {
            this.patchSessionWarningState({
                refreshing: true,
                error: null,
            });
        }

        this.getUserService().refreshSession$().subscribe({
            next: () => {
                this.keepAliveInFlight = false;
                this.handleSessionRefreshSuccess(mode, previousExpiry);
            },
            error: () => {
                this.keepAliveInFlight = false;
                this.handleSessionRefreshError(mode);
            }
        });
    }

    private handleSessionRefreshSuccess(mode: SessionRefreshMode, previousExpiry: number | null): void {
        if (mode !== 'manual') {
            return;
        }

        const nextExpiry = this.getStoredExpiry();
        const warningVisible = this.sessionWarningStateSubject.getValue().visible;
        const extended = nextExpiry !== null && (previousExpiry === null || nextExpiry > previousExpiry);

        if (!warningVisible) {
            return;
        }

        if (extended) {
            this.patchSessionWarningState({
                refreshing: false,
                error: null,
            });
            return;
        }

        this.patchSessionWarningState({
            refreshing: false,
            error: 'A munkamenet nem hosszabbodott meg. Mentse a módosításokat, majd jelentkezzen be újra.',
        });
        this.updateSessionWarningState();
    }

    private handleSessionRefreshError(mode: SessionRefreshMode): void {
        if (mode !== 'manual' || !this.sessionWarningStateSubject.getValue().visible) {
            return;
        }

        this.patchSessionWarningState({
            refreshing: false,
            error: 'Nem sikerült meghosszabbítani a munkamenetet. Mentse a módosításokat, majd próbálja újra.',
        });
        this.updateSessionWarningState();
    }

    private openSessionWarning(expiresAt: number): void {
        const current = this.sessionWarningStateSubject.getValue();
        const isSameWarning = current.visible && this.activeWarningExpiry === expiresAt;

        this.activeWarningExpiry = expiresAt;
        this.startWarningCountdown();
        this.sessionWarningStateSubject.next({
            visible: true,
            remainingMs: getRemainingSessionMs(expiresAt, Date.now()),
            refreshing: isSameWarning ? current.refreshing : false,
            error: isSameWarning ? current.error : null,
        });
    }

    private closeSessionWarning(): void {
        this.activeWarningExpiry = null;

        if (this.warningCountdownTimer !== null) {
            clearInterval(this.warningCountdownTimer);
            this.warningCountdownTimer = null;
        }

        if (this.sessionWarningStateSubject.getValue().visible) {
            this.sessionWarningStateSubject.next(INITIAL_SESSION_WARNING_STATE);
        }
    }

    private startWarningCountdown(): void {
        if (this.warningCountdownTimer !== null) {
            return;
        }

        this.warningCountdownTimer = setInterval(() => {
            this.updateSessionWarningState();
        }, 1000);
    }

    private updateSessionWarningState(): void {
        const expiresAt = this.getStoredExpiry() ?? this.activeWarningExpiry;
        if (expiresAt === null) {
            this.closeSessionWarning();
            return;
        }

        const remainingMs = getRemainingSessionMs(expiresAt, Date.now());
        if (remainingMs > this.warningBeforeExpiryMs) {
            this.closeSessionWarning();
            return;
        }

        const current = this.sessionWarningStateSubject.getValue();
        this.sessionWarningStateSubject.next({
            ...current,
            visible: true,
            remainingMs,
        });
    }

    private patchSessionWarningState(patch: Partial<SessionWarningState>): void {
        this.sessionWarningStateSubject.next({
            ...this.sessionWarningStateSubject.getValue(),
            ...patch,
        });
    }
}
