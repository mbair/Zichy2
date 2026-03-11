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
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { DrawerModule } from 'primeng/drawer';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { ConferenceSelectorComponent } from '../../selectors/conference-selector/conference-selector.component';
import { CountrySelectorComponent } from '../../selectors/country-selector/country-selector.component';
import { DietSelectorComponent } from '../../selectors/diet-selector/diet-selector.component';
import { MealSelectorComponent } from '../../selectors/meal-selector/meal-selector.component';
import { NationalitySelectorComponent } from '../../selectors/nationality-selector/nationality-selector.component';
import { PaymentSelectorComponent } from '../../selectors/payment-selector/payment-selector.component';
import { RoomKeySelectorComponent } from '../../selectors/roomkey-selector/roomkey-selector.component';
import { RoomTypeSelectorComponent } from '../../selectors/roomtype-selector/roomtype-selector.component';
import { ReactiveFileUploadModule } from '../../widget/reactive-file-upload/reactive-file-upload.module';
import { LocalizedDatePickerComponent } from '../../widget/localized-date-picker/localized-date-picker.component';

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
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        DialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        DrawerModule,
        TagModule,
        ImageModule,
        TooltipModule,
        CheckboxModule,
        DatePickerModule,
        SkeletonModule,
        SplitButtonModule,
        ConfirmDialogModule,
        MessageModule,
        ConferenceSelectorComponent,
        CountrySelectorComponent,
        DietSelectorComponent,
        MealSelectorComponent,
        NationalitySelectorComponent,
        PaymentSelectorComponent,
        RoomKeySelectorComponent,
        RoomTypeSelectorComponent,
        ReactiveFileUploadModule,
        LocalizedDatePickerComponent,
    ],
    declarations: [GuestComponent]
})
export class GuestModule { }
