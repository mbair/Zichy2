import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { UserSelectorComponent } from '../../selectors/user-selector/user-selector.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { LogService } from '../../service/log.service';

@NgModule({
    imports: [
        CommonModule,
        LogsRoutingModule,
        UserSelectorComponent,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        ProgressSpinnerModule,
        BlockUIModule,
        CalendarModule,
        ChipModule,
        TooltipModule,
    ],
    declarations: [LogsComponent],
    providers: [LogService]
})
export class LogsModule { }
