import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NFCTagRoutingModule } from './nfc-tag-routing.module';
import { NFCTagComponent } from './nfc-tag.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { SidebarModule } from 'primeng/sidebar';
import { ColorSelectorComponent } from '../../selectors/color-selector/color-selector.component';
import { YesNoSelectorComponent } from '../../selectors/yes-no-selector/yes-no-selector.component';
import { LocalizedDatePickerComponent } from '../../widget/localized-date-picker/localized-date-picker.component';

@NgModule({
    imports: [
        CommonModule,
        NFCTagRoutingModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        InputTextModule,
        DialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        TooltipModule,
        CalendarModule,
        LocalizedDatePickerComponent,
        SkeletonModule,
        SidebarModule,
        ColorSelectorComponent,
        YesNoSelectorComponent,
    ],
    declarations: [NFCTagComponent],
})
export class NFCTagModule { }
