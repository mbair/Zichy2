import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceFormRoutingModule } from './conference-form-routing.module';
import { ConferenceFormComponent } from './conference-form.component';
import { ReactiveFileUploadComponent } from './reactive-file-upload.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { AnimateEnterDirective } from './animateenter.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        CommonModule,
        ConferenceFormRoutingModule,
        ReactiveFormsModule,
        InputTextModule,
        CheckboxModule,
        CalendarModule,
        DropdownModule,
        CardModule,
        FileUploadModule,
        ButtonModule,
        RadioButtonModule,
        RouterModule,
        StyleClassModule,
        AppConfigModule,
        TagModule,
        ToastModule,
        TooltipModule,
    ],
    declarations: [
        ConferenceFormComponent,
        AnimateEnterDirective,
        ReactiveFileUploadComponent,
    ],
    exports: [ConferenceFormComponent]
})
export class ConferenceFormModule { }
