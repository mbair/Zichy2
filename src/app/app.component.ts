import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './demo/service/session.service';
import { APP_VERSION, APP_BUILD_TIME } from './app-version';

interface AppVersionManifest {
    version?: string;
    buildTime?: string;
}

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
        private sessionService: SessionService,
        private http: HttpClient) {

        // this language will be used as a fallback when a translation isn't found in the current language
        translateService.setDefaultLang('hu');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translateService.use('hu');
    }

    ngOnInit(): void {

        if (APP_VERSION) {
            localStorage.setItem("APP_VERSION", APP_VERSION)
            localStorage.setItem("APP_BUILD_TIME", APP_BUILD_TIME)
        }

        this.sessionService.initializeMonitoring();
        this.startVersionMonitoring();

        this.primengConfig.ripple = true;

        this.translateService.setDefaultLang('hu');

        this.primengConfig.setTranslation({
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
        })
    }


    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe((res: any) => this.primengConfig.setTranslation(res))
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
        if (this.versionCheckTimerId !== null) {
            window.clearInterval(this.versionCheckTimerId);
        }

        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('focus', this.handleWindowFocus);
        window.removeEventListener('error', this.handleWindowError);
        window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
}
