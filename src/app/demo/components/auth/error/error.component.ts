import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/demo/api/language';

@Component({
    templateUrl: './error.component.html'
})
export class ErrorComponent {

    languages: Language[] = []                   // List of system languages
    selectedLanguage: any;                       // Selected system language

    constructor(private translate: TranslateService) {}

    ngOnInit() {
        this.translate.addLangs(['gb', 'hu'])
        const browserLang = this.translate.getBrowserLang()
        /** Use EN lang az GB */
        let defaultLang = browserLang?.match(/en|hu/) ? browserLang : 'gb'
        this.translate.setDefaultLang(defaultLang)
        this.translate.use(defaultLang)

        // Set selected language
        if (browserLang) {
            this.selectedLanguage = this.languages.find(language =>
                language.code.toLowerCase() == defaultLang.toLowerCase()
            )
        }
    }

}
