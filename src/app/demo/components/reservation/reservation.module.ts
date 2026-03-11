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
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BedtypeSelectorComponent } from '../../selectors/bedtype-selector/bedtype-selector.component';
import { BuildingSelectorComponent } from '../../selectors/building-selector/building-selector.component';
import { ConferenceSelectorComponent } from '../../selectors/conference-selector/conference-selector.component';
import { GuestSelectorComponent } from '../../selectors/guest-selector/guest-selector.component';
import { ReservationStatusSelectorComponent } from '../../selectors/reservation-status-selector/reservation-status-selector.component';
import { RoomSelectorComponent } from '../../selectors/room-selector/room-selector.component';
import { ReservationService } from '../../service/reservation.service';
import { LocalizedDatePickerComponent } from '../../widget/localized-date-picker/localized-date-picker.component';

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
        DialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        SidebarModule,
        BedtypeSelectorComponent,
        BuildingSelectorComponent,
        ConferenceSelectorComponent,
        GuestSelectorComponent,
        TooltipModule,
        AvatarModule,
        AvatarGroupModule,
        ReservationStatusSelectorComponent,
        RoomSelectorComponent,
        TranslateModule,
        CalendarModule,
        LocalizedDatePickerComponent,
        InputTextareaModule,
        ConfirmDialogModule
    ],
    declarations: [ReservationComponent],
    providers: [ReservationService]
})
export class ReservationModule { }
