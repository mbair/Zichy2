import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { ForgotPasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotPasswordComponent } from './forgotpassword.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ButtonModule,
        InputTextModule,
        ForgotPasswordRoutingModule,
        AppConfigModule,
        MessageModule
    ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
