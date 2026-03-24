import { Injectable } from '@angular/core';

type AuthProfileField = 'email' | 'fullname' | 'phone' | 'userid' | 'userrole' | 'user_rolesid';

@Injectable({
    providedIn: 'root'
})
export class AuthStorageService {

    private readonly sessionExpiryStorageKey = 'session_expires_at';
    private readonly postLoginRedirectStorageKey = 'post_login_redirect_url';

    getSessionExpiry(): string | null {
        return sessionStorage.getItem(this.sessionExpiryStorageKey);
    }

    setSessionExpiry(expiresAt: number): void {
        sessionStorage.setItem(this.sessionExpiryStorageKey, String(expiresAt));
    }

    removeSessionExpiry(): void {
        sessionStorage.removeItem(this.sessionExpiryStorageKey);
    }

    getPostLoginRedirectUrl(): string | null {
        return sessionStorage.getItem(this.postLoginRedirectStorageKey);
    }

    setPostLoginRedirectUrl(url: string): void {
        sessionStorage.setItem(this.postLoginRedirectStorageKey, url);
    }

    removePostLoginRedirectUrl(): void {
        sessionStorage.removeItem(this.postLoginRedirectStorageKey);
    }

    getProfileField(field: AuthProfileField): string | null {
        return sessionStorage.getItem(field);
    }

    setProfileField(field: AuthProfileField, value: string | number): void {
        sessionStorage.setItem(field, String(value));
    }

    setProfileFields(fields: Partial<Record<AuthProfileField, string | number | null | undefined>>): void {
        Object.entries(fields).forEach(([field, value]) => {
            if (value === undefined || value === null) {
                sessionStorage.removeItem(field);
                return;
            }

            sessionStorage.setItem(field, String(value));
        });
    }

    clearAuthSession(): void {
        this.removeSessionExpiry();
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('fullname');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('user_rolesid');
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('userrole');
    }
}
