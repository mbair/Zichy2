import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../api/language';

@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent {
    
    languages: Language[] = []       // List of system languages
    currentLanguage: string          // Current system language 
    selectedLanguage: any            // Selected system language

    constructor(private translate: TranslateService) {

        // Set language options for the language selector component
        this.languages = [
            {
                name: "Hungary",
                huname: "Magyarország",
                nationality: "Hungarian",
                hunationality: "magyar",
                code: "HU"
            },
            {
                name: "United Kingdom",
                huname: "Egyesült Királyság",
                nationality: "brit",
                hunationality: "angol",
                code: "GB"
            }
        ]

        // Add the country codes to the translate service
        const countryCodes = this.languages.map(language => language.code.toLowerCase())
        this.translate.addLangs(countryCodes)
        
        // Set browser language as default language
        const browserLang = this.translate.getBrowserLang()
        let defaultLang = browserLang && browserLang.startsWith('hu') ? 'hu' : 'gb'
        this.translate.setDefaultLang(defaultLang)
        this.translate.use(defaultLang)
        this.currentLanguage = this.translate.currentLang

        // Set selected language
        if (browserLang) {
            this.selectedLanguage = this.languages.find(language =>
                language.code.toLowerCase() == defaultLang.toLowerCase()
            )
        }
    }

    /**
     * Handles the event of the user selecting a language from the language selector.
     * @param lang the selected language
     */
    onLanguageChange(lang: any) {
        const langCode = lang.code.toLowerCase()
        this.translate.use(langCode)
        this.currentLanguage = langCode
    }
}