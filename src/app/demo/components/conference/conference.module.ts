import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConferenceComponent } from './conference.component';
import { ConferenceRoutingModule } from './conference-routing.module';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { TagModule } from 'primeng/tag';
import { TreeTableModule } from 'primeng/treetable';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectorsModule } from '../../selectors/selectors.module';
import { WidgetModule } from '../../widget/widget.module';

@NgModule({
	imports: [
		CommonModule,
		ConferenceRoutingModule,
		TableModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        DrawerModule,
        ProgressSpinnerModule,
        BlockUIModule,
        TagModule,
        TreeTableModule,
        TooltipModule,
        CheckboxModule,
        DatePickerModule,
        SkeletonModule,
        SelectButtonModule,
        SelectorsModule,
        WidgetModule,
	],
	declarations: [ConferenceComponent]
})
export class ConferenceModule { }
