import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitchenCalendarRoutingModule } from './kitchen-calendar-routing.module';
import { KitchenCalendarComponent } from './kitchen-calendar.component';
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
import { CardModule } from 'primeng/card';
import { DataViewModule  } from 'primeng/dataview';
import { TranslateModule } from '@ngx-translate/core';
import { SelectorsModule } from '../../selectors/selectors.module';
import { KitchenCalendarService } from '../../service/kitchen-calendar.service';

@NgModule({
    imports: [
        CommonModule,
        CardModule,
        DataViewModule,
        KitchenCalendarRoutingModule,
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
        TranslateModule,
    ],
    declarations: [KitchenCalendarComponent],
    providers: [KitchenCalendarService]
})
export class KitchenCalendarModule { }
