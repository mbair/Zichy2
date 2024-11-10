import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceFormRoutingModule } from './conference-form-routing.module';
import { ConferenceFormComponent } from './conference-form.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { AnimateEnterDirective } from './animateenter.directive';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { SelectorsModule } from '../../selectors/selectors.module';
import { WidgetModule } from '../../widget/widget.module';

@NgModule({
    imports: [
        CommonModule,
        ConferenceFormRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CheckboxModule,
        CalendarModule,
        ChipsModule,
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
        HttpClientModule,
        TranslateModule,
        SelectorsModule,
        WidgetModule,
    ],
    declarations: [
        ConferenceFormComponent,
        AnimateEnterDirective,
    ],
    exports: [ConferenceFormComponent]
})
export class ConferenceFormModule { }
