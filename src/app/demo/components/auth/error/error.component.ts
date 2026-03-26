import { Component } from '@angular/core';
import { LanguageService } from 'src/app/demo/service/language.service';

@Component({
    templateUrl: './error.component.html'
})
export class ErrorComponent {
    constructor(private languageService: LanguageService) {}

    ngOnInit() {
        this.languageService.initializePublicLanguageFromBrowser();
    }

}
