import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConferenceComponent } from './conference.component';
import { ConferenceRoutingModule } from './conference-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { MealSelectorComponent } from '../../selectors/meal-selector/meal-selector.component';
import { PaymentSelectorComponent } from '../../selectors/payment-selector/payment-selector.component';
import { RoomTypeSelectorComponent } from '../../selectors/roomtype-selector/roomtype-selector.component';
import { ContractingPartySelectorComponent } from '../../selectors/contracting-party-selector/contracting-party-selector.component';
import { UserSelectorComponent } from '../../selectors/user-selector/user-selector.component';
import { YesNoSelectorComponent } from '../../selectors/yes-no-selector/yes-no-selector.component';
import { WidgetModule } from '../../widget/widget.module';
import { LocalizedDatePickerComponent } from '../../widget/localized-date-picker/localized-date-picker.component';

@NgModule({
    imports: [
        CommonModule,
        ConferenceRoutingModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        InputTextModule,
        DialogModule,
        SidebarModule,
        ProgressSpinnerModule,
        BlockUIModule,
        TooltipModule,
        CalendarModule,
        SkeletonModule,
        SelectButtonModule,
        DropdownModule,
        MealSelectorComponent,
        PaymentSelectorComponent,
        RoomTypeSelectorComponent,
        ContractingPartySelectorComponent,
        UserSelectorComponent,
        YesNoSelectorComponent,
        LocalizedDatePickerComponent,
        WidgetModule,
    ],
    declarations: [ConferenceComponent],
})
export class ConferenceModule {}
