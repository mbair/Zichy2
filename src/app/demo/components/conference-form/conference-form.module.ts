import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceFormRoutingModule } from './conference-form-routing.module';
import { ConferenceFormComponent } from './conference-form.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { AnimateEnterDirective } from './animateenter.directive';

@NgModule({
    imports: [
        CommonModule,
        ConferenceFormRoutingModule,
        ButtonModule,
        RouterModule,
        StyleClassModule,
        AppConfigModule,
    ],
    declarations: [ConferenceFormComponent, AnimateEnterDirective]
})
export class ConferenceFormModule { }
