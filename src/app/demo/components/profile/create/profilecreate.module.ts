import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import { ProfileCreateComponent } from './profilecreate.component';
import { ProfileCreateRoutingModule } from './profilecreate-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProfileCreateRoutingModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
		SelectModule,
		FileUploadModule,
		TextareaModule
	],
	declarations: [ProfileCreateComponent]
})
export class ProfileCreateModule { }
