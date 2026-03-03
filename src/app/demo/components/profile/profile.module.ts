import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
	imports: [
        BlockUIModule,
		CommonModule,
		FormsModule,
		ProfileRoutingModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
		SelectModule,
		FileUploadModule,
		TextareaModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        TagModule,
        MessageModule,
        ProgressSpinnerModule,
        PasswordModule
	],
	declarations: [ProfileComponent]
})
export class ProfileModule { }
