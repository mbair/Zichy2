import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NFCTagRoutingModule } from './nfc-tag-routing.module';
import { NFCTagComponent } from './nfc-tag.component';
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
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { SkeletonModule } from 'primeng/skeleton';
import { DrawerModule } from 'primeng/drawer';
import { SelectorsModule } from '../../selectors/selectors.module';

@NgModule({
    imports: [
        CommonModule,
        NFCTagRoutingModule,
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
        TagModule,
        MessageModule,
        ProgressSpinnerModule,
        BlockUIModule,
        TooltipModule,
        CheckboxModule,
        DatePickerModule,
        SkeletonModule,
        DrawerModule,
        SelectorsModule,
    ],
    declarations: [NFCTagComponent],
})
export class NFCTagModule { }
