import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MessageModule,
        PasswordModule,
        TranslateModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
