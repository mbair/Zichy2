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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { TreeTableModule } from 'primeng/treetable';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
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
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        SidebarModule,
        TagModule,
        ImageModule,
        TreeTableModule,
        TooltipModule,
        CheckboxModule,
        CalendarModule,
        SkeletonModule,
        SplitButtonModule,
        SelectorsModule,
        WidgetModule,
    ],
    declarations: [GuestComponent]
})
export class GuestModule { }
