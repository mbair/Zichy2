import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subscription } from 'rxjs';

import { CardModule } from 'primeng/card';

@Component({
    templateUrl: './conference-form.component.html',
    styleUrls: ['./conference-form.component.scss']
})
export class ConferenceFormComponent implements OnDestroy {

    subscription: Subscription;

    darkMode: boolean = false;

    constructor(public router: Router, private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
