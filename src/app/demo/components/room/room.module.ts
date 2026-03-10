import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
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
import { ChipModule } from 'primeng/chip';
import { BathroomSelectorComponent } from '../../selectors/bathroom-selector/bathroom-selector.component';
import { BedtypeSelectorComponent } from '../../selectors/bedtype-selector/bedtype-selector.component';
import { BuildingSelectorComponent } from '../../selectors/building-selector/building-selector.component';
import { ConferenceSelectorComponent } from '../../selectors/conference-selector/conference-selector.component';
import { FloorSelectorComponent } from '../../selectors/floor-selector/floor-selector.component';
import { RoomTypeSelectorComponent } from '../../selectors/roomtype-selector/roomtype-selector.component';
import { SparebedSelectorComponent } from '../../selectors/sparebed-selector/sparebed-selector.component';
import { RoomService } from '../../service/room.service';

@NgModule({
    imports: [
        CommonModule,
        RoomRoutingModule,
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
        BathroomSelectorComponent,
        BedtypeSelectorComponent,
        BuildingSelectorComponent,
        ConferenceSelectorComponent,
        FloorSelectorComponent,
        InputSwitchModule,
        TooltipModule,
        ProgressBarModule,
        AvatarModule,
        AvatarGroupModule,
        SliderModule,
        RadioButtonModule,
        RoomTypeSelectorComponent,
        SparebedSelectorComponent,
        TranslateModule,
        ChipModule
    ],
    declarations: [RoomComponent],
    providers: [RoomService]
})
export class RoomModule { }
