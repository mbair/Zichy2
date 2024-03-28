import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodCounterRoutingModule } from './food-counter-routing.module';
import { FoodCounterComponent } from './food-counter.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';

import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FoodCounterRoutingModule,
        ReactiveFormsModule,
        InputTextModule,
        CheckboxModule,
        CalendarModule,
        DropdownModule,
        CardModule,
        FileUploadModule,
        ButtonModule,
        RadioButtonModule,
        RouterModule,
        StyleClassModule,
        AppConfigModule,
        ToastModule,
        TooltipModule,
    ],
    declarations: [
        FoodCounterComponent,
    ],
    exports: [FoodCounterComponent]
})
export class FoodCounterModule { }
