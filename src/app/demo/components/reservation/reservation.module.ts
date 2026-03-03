import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { DrawerModule } from 'primeng/drawer';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { ChipModule } from 'primeng/chip';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectorsModule } from '../../selectors/selectors.module';
import { ReservationService } from '../../service/reservation.service';

@NgModule({
    imports: [
        CommonModule,
        ReservationRoutingModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        InputTextModule,
        SelectModule,
        DialogModule,
        TagModule,
        MessageModule,
        ProgressSpinnerModule,
        BlockUIModule,
        DrawerModule,
        SelectorsModule,
        ToggleSwitchModule,
        TooltipModule,
        ProgressBarModule,
        AvatarModule,
        AvatarGroupModule,
        SliderModule,
        RadioButtonModule,
        TranslateModule,
        DatePickerModule,
        ChipModule,
        TextareaModule,
        ConfirmDialogModule
    ],
    declarations: [ReservationComponent],
    providers: [ReservationService]
})
export class ReservationModule { }
