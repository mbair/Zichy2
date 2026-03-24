import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageService } from './demo/service/language.service';
import { SessionService } from './demo/service/session.service';
import { AuthService } from './demo/service/auth.service';
import { APP_VERSION, APP_BUILD_TIME } from './app-version';
import { Subscription } from 'rxjs';

interface AppVersionManifest {
    version?: string;
    buildTime?: string;
}

const PRIME_NG_TRANSLATIONS = {
    hu: {
        "startsWith": "Kezdődik",
        "contains": "Tartalmazza",
        "notContains": "Nem tartalmazza",
        "endsWith": "Végződik",
        "equals": "Egyenlő",
        "notEquals": "Nem egyenlő",
        "noFilter": "Nincs szűrő",
        "lt": "Kevesebb, mint",
        "lte": "Kevesebb vagy egyenlő",
        "gt": "Nagyobb, mint",
        "gte": "Nagyobb vagy egyenlő",
        "is": "Az",
        "isNot": "Nem az",
        "before": "Előtt",
        "after": "Után",
        "dateIs": "A dátum",
        "dateIsNot": "A dátum nem",
        "dateBefore": "A dátum előtti",
        "dateAfter": "A dátum utáni",
        "clear": "Törlés",
        "apply": "Alkalmaz",
        "matchAll": "Mindet illeszt",
        "matchAny": "Bármelyiket illeszt",
        "addRule": "Szabály hozzáadása",
        "removeRule": "Szabály eltávolítása",
        "accept": "Igen",
        "reject": "Nem",
        "choose": "Választ",
        "upload": "Feltölt",
        "cancel": "Mégse",
        "dayNames": ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
        "dayNamesShort": ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo"],
        "dayNamesMin": ["Va", "Hé", "Ke", "Sz", "Cs", "Pé", "Sz"],
        "monthNames": ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
        "monthNamesShort": ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sze", "Okt", "Nov", "Dec"],
        "dateFormat": "yy.mm.dd",
        "firstDayOfWeek": 1,
        "today": "Ma",
        "weekHeader": "Wk",
        "weak": "Gyenge",
        "medium": "Közepes",
        "strong": "Erős",
        "passwordPrompt": "Adja meg a jelszót",
        "emptyMessage": "Nincs találat",
        "emptyFilterMessage": "Nincs találat"
    },
    gb: {
        "startsWith": "Starts with",
        "contains": "Contains",
        "notContains": "Does not contain",
        "endsWith": "Ends with",
        "equals": "Equals",
        "notEquals": "Not equals",
        "noFilter": "No filter",
        "lt": "Less than",
        "lte": "Less than or equal to",
        "gt": "Greater than",
        "gte": "Greater than or equal to",
        "is": "Is",
        "isNot": "Is not",
        "before": "Before",
        "after": "After",
        "dateIs": "Date is",
        "dateIsNot": "Date is not",
        "dateBefore": "Date is before",
        "dateAfter": "Date is after",
        "clear": "Clear",
        "apply": "Apply",
        "matchAll": "Match all",
        "matchAny": "Match any",
        "addRule": "Add rule",
        "removeRule": "Remove rule",
        "accept": "Yes",
        "reject": "No",
        "choose": "Choose",
        "upload": "Upload",
        "cancel": "Cancel",
        "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "dayNamesMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "dateFormat": "dd/mm/yy",
        "firstDayOfWeek": 1,
        "today": "Today",
        "weekHeader": "Wk",
        "weak": "Weak",
        "medium": "Medium",
        "strong": "Strong",
        "passwordPrompt": "Enter a password",
        "emptyMessage": "No results found",
        "emptyFilterMessage": "No results found"
    }
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class AppComponent implements OnInit, OnDestroy {
    private readonly versionCheckIntervalMs = 5 * 60 * 1000;
    private readonly chunkReloadStorageKey = 'APP_CHUNK_RELOAD_ATTEMPTED_FOR';
    private readonly versionCheckHeaders = new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    });
    private versionCheckTimerId: number | null = null;
    private isReloading = false;

    readonly currentVersion = APP_VERSION;
    latestVersion: string | null = null;
    updateAvailable = false;
    private languageChangeSubscription?: Subscription;

    private readonly handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden' && this.updateAvailable) {
            this.reloadToLatestVersion();
            return;
        }

        if (document.visibilityState === 'visible') {
            this.checkForNewVersion();
        }
    };

    private readonly handleWindowFocus = () => {
        this.checkForNewVersion();
    };

    private readonly handleWindowError = (event: ErrorEvent) => {
        if (this.isChunkLoadFailure(event.error, event.message)) {
            this.reloadAfterChunkLoadFailure();
        }
    };

    private readonly handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        if (this.isChunkLoadFailure(event.reason)) {
            this.reloadAfterChunkLoadFailure();
        }
    };

    constructor(private primengConfig: PrimeNGConfig,
        private translateService: TranslateService,
        private languageService: LanguageService,
        private sessionService: SessionService,
        private authService: AuthService,
        private http: HttpClient) {
        this.languageService.initializeSystemLanguage();
    }

    ngOnInit(): void {

        if (APP_VERSION) {
            localStorage.setItem("APP_VERSION", APP_VERSION)
            localStorage.setItem("APP_BUILD_TIME", APP_BUILD_TIME)
        }

        this.sessionService.initializeMonitoring();
        this.restoreSessionFromCookieIfNeeded();
        this.startVersionMonitoring();

        this.primengConfig.ripple = true;
        this.applyLanguageSettings(this.languageService.getCurrentLanguage());

        this.languageChangeSubscription = this.translateService.onLangChange.subscribe((event) => {
            this.applyLanguageSettings(event.lang);
        });
    }


    translate(lang: string) {
        this.languageService.setActiveLanguage(lang);
    }

    private restoreSessionFromCookieIfNeeded(): void {
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath.includes('/auth/');

        if (this.sessionService.hasActiveSessionSnapshot() || isAuthPage) {
            return;
        }

        this.authService.restoreSessionFromCookie$().subscribe();
    }

    reloadToLatestVersion() {
        if (this.isReloading) {
            return;
        }

        this.isReloading = true;
        window.location.reload();
    }

    private startVersionMonitoring(): void {
        this.checkForNewVersion();

        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        window.addEventListener('focus', this.handleWindowFocus);
        window.addEventListener('error', this.handleWindowError);
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection);

        this.versionCheckTimerId = window.setInterval(() => {
            this.checkForNewVersion();
        }, this.versionCheckIntervalMs);
    }

    private checkForNewVersion(): void {
        this.http.get<AppVersionManifest>(this.buildVersionCheckUrl(), {
            headers: this.versionCheckHeaders
        }).subscribe({
            next: (manifest: AppVersionManifest) => {
                const latestVersion = String(manifest?.version || '').trim();

                if (!latestVersion || latestVersion === APP_VERSION) {
                    return;
                }

                this.latestVersion = latestVersion;
                this.updateAvailable = true;

                if (document.visibilityState === 'hidden') {
                    this.reloadToLatestVersion();
                }
            },
            error: () => undefined
        });
    }

    private buildVersionCheckUrl(): string {
        return `assets/version.json?t=${Date.now()}`;
    }

    private applyLanguageSettings(lang?: string | null): void {
        const resolvedLang = this.resolveSupportedLanguage(lang);
        this.primengConfig.setTranslation(PRIME_NG_TRANSLATIONS[resolvedLang]);
        document.documentElement.lang = resolvedLang === 'gb' ? 'en-GB' : 'hu-HU';
    }

    private resolveSupportedLanguage(lang?: string | null): 'hu' | 'gb' {
        return lang === 'gb' ? 'gb' : 'hu';
    }

    private reloadAfterChunkLoadFailure(): void {
        if (this.hasAlreadyRetriedChunkReload()) {
            return;
        }

        sessionStorage.setItem(this.chunkReloadStorageKey, APP_VERSION);
        this.reloadToLatestVersion();
    }

    private hasAlreadyRetriedChunkReload(): boolean {
        return sessionStorage.getItem(this.chunkReloadStorageKey) === APP_VERSION;
    }

    private isChunkLoadFailure(error: unknown, fallbackMessage = ''): boolean {
        const message = this.extractErrorMessage(error, fallbackMessage);
        if (!message) {
            return false;
        }

        return /ChunkLoadError/i.test(message)
            || /Loading chunk [\d]+ failed/i.test(message)
            || /Failed to fetch dynamically imported module/i.test(message)
            || /Importing a module script failed/i.test(message);
    }

    private extractErrorMessage(error: unknown, fallbackMessage = ''): string {
        if (typeof error === 'string') {
            return error;
        }

        if (error instanceof Error) {
            return error.message || fallbackMessage;
        }

        if (error && typeof error === 'object' && 'message' in error) {
            const message = (error as { message?: unknown }).message;
            return typeof message === 'string' ? message : fallbackMessage;
        }

        return fallbackMessage;
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
        this.languageChangeSubscription?.unsubscribe();

        if (this.versionCheckTimerId !== null) {
            window.clearInterval(this.versionCheckTimerId);
        }

        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('focus', this.handleWindowFocus);
        window.removeEventListener('error', this.handleWindowError);
        window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
}
