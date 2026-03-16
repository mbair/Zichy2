import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BedtypeSelectorComponent } from '../selectors/bedtype-selector/bedtype-selector.component';
import { BuildingSelectorComponent } from '../selectors/building-selector/building-selector.component';
import { ConferenceSelectorComponent } from '../selectors/conference-selector/conference-selector.component';
import { SparebedSelectorComponent } from '../selectors/sparebed-selector/sparebed-selector.component';
import { RoomConferenceBinderComponent } from './room-conference-binder/room-conference-binder.component';
import { ReactiveFileUploadModule } from './reactive-file-upload/reactive-file-upload.module';

@NgModule({
    declarations: [
        RoomConferenceBinderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        BedtypeSelectorComponent,
        BuildingSelectorComponent,
        ConferenceSelectorComponent,
        DialogModule,
        SidebarModule,
        SparebedSelectorComponent,
        TableModule,
        DropdownModule,
        MultiSelectModule,
        InputTextModule,
        TooltipModule,
        ChipModule,
        ConfirmDialogModule,
        BlockUIModule,
        ProgressSpinnerModule,
        SkeletonModule,
        ToastModule,
        ToggleButtonModule,
        ReactiveFileUploadModule,
    ],
    exports: [
        RoomConferenceBinderComponent,
        ReactiveFileUploadModule,
    ],
})
export class WidgetModule {}
