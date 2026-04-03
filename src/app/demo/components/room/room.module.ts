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
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
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
        DialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        SidebarModule,
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
        ChipModule,
        SkeletonModule
    ],
    declarations: [RoomComponent],
    providers: [RoomService]
})
export class RoomModule { }
