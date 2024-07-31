import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewPasswordComponent } from './newpassword.component';
import { NewPasswordRoutingModule } from './newpassword-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        CommonModule,
        NewPasswordRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        AppConfigModule,
        PasswordModule,
        MessagesModule
    ],
    declarations: [NewPasswordComponent]
})
export class NewPasswordModule { }
