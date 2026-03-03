import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { DrawerModule } from 'primeng/drawer';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { TreeTableModule } from 'primeng/treetable';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { SelectorsModule } from '../../selectors/selectors.module';
import { WidgetModule } from '../../widget/widget.module';

@NgModule({
    imports: [
        CommonModule,
        GuestRoutingModule,
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
        ProgressSpinnerModule,
        BlockUIModule,
        DrawerModule,
        TagModule,
        ImageModule,
        TreeTableModule,
        TooltipModule,
        CheckboxModule,
        DatePickerModule,
        SkeletonModule,
        SplitButtonModule,
        ConfirmDialogModule,
        MessageModule,
        SelectorsModule,
        WidgetModule,
    ],
    declarations: [GuestComponent]
})
export class GuestModule { }
