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
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { CountrySelectorComponent } from '../../selectors/country-selector/country-selector.component';
import { DietSelectorComponent } from '../../selectors/diet-selector/diet-selector.component';
import { LanguageSelectorComponent } from '../../selectors/language-selector/language.component';
import { MealSelectorComponent } from '../../selectors/meal-selector/meal-selector.component';
import { NationalitySelectorComponent } from '../../selectors/nationality-selector/nationality-selector.component';
import { PaymentSelectorComponent } from '../../selectors/payment-selector/payment-selector.component';
import { RoomTypeSelectorComponent } from '../../selectors/roomtype-selector/roomtype-selector.component';
import { ReactiveFileUploadModule } from '../../widget/reactive-file-upload/reactive-file-upload.module';

@NgModule({
    imports: [
        CommonModule,
        ConferenceFormRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputMaskModule,
        CheckboxModule,
        CalendarModule,
        ChipsModule,
        MessagesModule,
        ButtonModule,
        RadioButtonModule,
        RouterModule,
        StyleClassModule,
        AppConfigModule,
        ToastModule,
        TooltipModule,
        HttpClientModule,
        TranslateModule,
        CountrySelectorComponent,
        DietSelectorComponent,
        LanguageSelectorComponent,
        MealSelectorComponent,
        NationalitySelectorComponent,
        PaymentSelectorComponent,
        RoomTypeSelectorComponent,
        ReactiveFileUploadModule,
    ],
    declarations: [
        ConferenceFormComponent,
        AnimateEnterDirective,
    ],
    exports: [ConferenceFormComponent]
})
export class ConferenceFormModule { }
