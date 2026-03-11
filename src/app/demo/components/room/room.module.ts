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
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { DrawerModule } from 'primeng/drawer';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
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
        SelectModule,
        DialogModule,
        TagModule,
        MessageModule,
        ProgressSpinnerModule,
        BlockUIModule,
        DrawerModule,
        ToggleSwitchModule,
        BathroomSelectorComponent,
        BedtypeSelectorComponent,
        BuildingSelectorComponent,
        ConferenceSelectorComponent,
        FloorSelectorComponent,
        TooltipModule,
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
