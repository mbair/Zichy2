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
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
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
        DropdownModule,
        DialogModule,
        TagModule,
        MessagesModule,
        ProgressSpinnerModule,
        BlockUIModule,
        SidebarModule,
        SelectorsModule,
        InputSwitchModule,
        TooltipModule,
        ProgressBarModule,
        AvatarModule,
        AvatarGroupModule,
        SliderModule,
        RadioButtonModule,
        TranslateModule,
        CalendarModule,
        ChipModule
    ],
    declarations: [ReservationComponent],
    providers: [ReservationService]
})
export class ReservationModule { }
