import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
    let translateSpy: jasmine.SpyObj<TranslateService> & {
        currentLang?: string;
        defaultLang?: string;
    };
    let service: LanguageService;

    beforeEach(() => {
        translateSpy = jasmine.createSpyObj<TranslateService>(
            'TranslateService',
            ['addLangs', 'getBrowserLang', 'setDefaultLang', 'use'],
        ) as jasmine.SpyObj<TranslateService> & {
            currentLang?: string;
            defaultLang?: string;
        };

        service = new LanguageService(translateSpy);
    });

    it('registers the supported languages', () => {
        expect(translateSpy.addLangs).toHaveBeenCalledWith(['hu', 'gb']);
    });

    it('forces Hungarian for the internal system', () => {
        const lang = service.initializeSystemLanguage();

        expect(lang).toBe('hu');
        expect(translateSpy.setDefaultLang).toHaveBeenCalledWith('hu');
        expect(translateSpy.use).toHaveBeenCalledWith('hu');
    });

    it('uses the browser language for public pages when supported', () => {
        translateSpy.getBrowserLang.and.returnValue('en');

        const lang = service.initializePublicLanguageFromBrowser();

        expect(lang).toBe('gb');
        expect(translateSpy.setDefaultLang).toHaveBeenCalledWith('gb');
        expect(translateSpy.use).toHaveBeenCalledWith('gb');
    });

    it('maps GB to English content keys', () => {
        translateSpy.currentLang = 'gb';

        expect(service.getCurrentContentLanguage()).toBe('en');
    });

    it('returns the matching language option for the current code', () => {
        const language = service.findLanguageByCode('gb');

        expect(language?.code).toBe('GB');
    });
});
