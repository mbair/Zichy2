import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConferenceCreateComponent } from './conferencecreate.component';
import { ConferenceCreateRoutingModule } from './conferencecreate-routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ConferenceCreateRoutingModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
        CalendarModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule
	],
	declarations: [ConferenceCreateComponent]
})
export class ConferenceCreateModule { }
