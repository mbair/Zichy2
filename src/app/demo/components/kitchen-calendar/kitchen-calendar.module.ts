import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KitchenCalendarRoutingModule } from './kitchen-calendar-routing.module';
import { KitchenCalendarComponent } from './kitchen-calendar.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { TooltipModule } from 'primeng/tooltip';
import { DatePickerModule } from 'primeng/datepicker';
import { KitchenCalendarService } from '../../service/kitchen-calendar.service';
import { LocalizedDatePickerComponent } from '../../widget/localized-date-picker/localized-date-picker.component';

@NgModule({
    imports: [
        BlockUIModule,
        DatePickerModule,
        CommonModule,
        FormsModule,
        KitchenCalendarRoutingModule,
        LocalizedDatePickerComponent,
        ProgressSpinnerModule,
        TableModule,
        ToastModule,
        TooltipModule,
    ],
    declarations: [KitchenCalendarComponent],
    providers: [KitchenCalendarService],
    exports: [KitchenCalendarComponent]
})
export class KitchenCalendarModule { }
