import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../api/language';

export type AppLanguageCode = 'hu' | 'gb';
export type ContentLanguageCode = 'hu' | 'en';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    readonly languages: Language[] = [
        {
            name: 'Hungary',
            huname: 'Magyarország',
            nationality: 'Hungarian',
            hunationality: 'magyar',
            code: 'HU',
        },
        {
            name: 'United Kingdom',
            huname: 'Egyesült Királyság',
            nationality: 'brit',
            hunationality: 'angol',
            code: 'GB',
        },
    ];

    private readonly supportedLanguages: AppLanguageCode[] = ['hu', 'gb'];

    constructor(private readonly translate: TranslateService) {
        this.ensureSupportedLanguagesRegistered();
    }

    initializeSystemLanguage(): AppLanguageCode {
        return this.setActiveLanguage('hu');
    }

    initializePublicLanguageFromBrowser(): AppLanguageCode {
        const browserLang = this.translate.getBrowserLang();
        return this.setActiveLanguage(browserLang);
    }

    setActiveLanguage(lang?: string | null): AppLanguageCode {
        const resolvedLang = this.normalizeLanguage(lang);
        this.ensureSupportedLanguagesRegistered();
        this.translate.setDefaultLang(resolvedLang);
        this.translate.use(resolvedLang);
        return resolvedLang;
    }

    getCurrentLanguage(): AppLanguageCode {
        return this.normalizeLanguage(
            this.translate.currentLang || this.translate.defaultLang,
        );
    }

    getCurrentContentLanguage(): ContentLanguageCode {
        return this.getCurrentLanguage() === 'gb' ? 'en' : 'hu';
    }

    findLanguageByCode(lang?: string | null): Language | undefined {
        const resolvedLang = this.normalizeLanguage(lang);
        return this.languages.find(
            (language) => language.code.toLowerCase() === resolvedLang,
        );
    }

    private ensureSupportedLanguagesRegistered(): void {
        this.translate.addLangs(this.supportedLanguages);
    }

    private normalizeLanguage(lang?: string | null): AppLanguageCode {
        const normalizedLang = lang?.toLowerCase() || '';

        if (normalizedLang.startsWith('gb') || normalizedLang.startsWith('en')) {
            return 'gb';
        }

        return 'hu';
    }
}
