import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { PageHintService } from './page-hint.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    readonly pageHint$ = this.pageHintService.pageHint$;

    constructor(
        public layoutService: LayoutService,
        private pageHintService: PageHintService
    ) { }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }

    onHelpButtonClick() {
        this.layoutService.toggleHelpSidebar();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }
    
}
