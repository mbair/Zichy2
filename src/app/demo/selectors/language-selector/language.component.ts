import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Language } from '../../api/language';
import { LanguageService } from '../../service/language.service';

@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, DropdownModule]
})
export class LanguageSelectorComponent {
    languages: Language[] = [];
    currentLanguage: string;
    selectedLanguage?: Language;

    constructor(private languageService: LanguageService) {
        this.languages = this.languageService.languages;
        this.currentLanguage = this.languageService.getCurrentLanguage();
        this.selectedLanguage = this.languageService.findLanguageByCode(
            this.currentLanguage,
        );
    }

    /**
     * Handles the event of the user selecting a language from the language selector.
     * @param lang the selected language
     */
    onLanguageChange(lang?: Language) {
        if (!lang) {
            return;
        }

        this.currentLanguage = this.languageService.setActiveLanguage(
            lang.code,
        );
        this.selectedLanguage = this.languageService.findLanguageByCode(
            this.currentLanguage,
        );
    }
}
