import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DietRoutingModule } from './diet-routing.module';
import { DietComponent } from './diet.component';
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
import { SelectorsModule } from '../../selectors/selectors.module';
import { DietService } from '../../service/diet.service';

@NgModule({
    imports: [
        CommonModule,
        DietRoutingModule,
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
    ],
    declarations: [DietComponent],
    providers: [DietService]
})
export class DietModule { }
