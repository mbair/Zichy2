import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LockScreenRoutingModule } from './lockscreen-routing.module';
import { LockScreenComponent } from './lockscreen.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        LockScreenRoutingModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        MessagesModule,
        PasswordModule
    ],
    declarations: [LockScreenComponent]
})
export class LockScreenModule { }
