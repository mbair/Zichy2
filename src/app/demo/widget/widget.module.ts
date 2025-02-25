import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFileUploadComponent } from './reactive-file-upload/reactive-file-upload.component';
import { RoomConferenceBinderComponent } from './room-conference-binder/room-conference-binder.component';
import { SelectorsModule } from "../selectors/selectors.module";

@NgModule({
    declarations: [
        ReactiveFileUploadComponent,
        RoomConferenceBinderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FileUploadModule,
        DialogModule,
        SidebarModule,
        SelectorsModule,
        TableModule,
        DropdownModule,
        MultiSelectModule,
        InputTextModule,
        TooltipModule,
    ],
    exports: [
        ReactiveFileUploadComponent,
        RoomConferenceBinderComponent,
    ],
})
export class WidgetModule {}
