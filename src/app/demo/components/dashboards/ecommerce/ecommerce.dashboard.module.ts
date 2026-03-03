import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceDashboardComponent } from './ecommerce.dashboard.component';
import { EcommerceDashboardRoutigModule } from './ecommerce.dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { KnobModule } from 'primeng/knob';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { SelectorsModule } from '../../../selectors/selectors.module';
import { StyleClassModule } from "primeng/styleclass";

@NgModule({
	imports: [
    CommonModule,
    EcommerceDashboardRoutigModule,
    ButtonModule,
    RippleModule,
    SelectModule,
    FormsModule,
    TableModule,
    InputTextModule,
    TextareaModule,
    ChartModule,
    RatingModule,
    KnobModule,
    CardModule,
    SelectorsModule,
    StyleClassModule
],
	declarations: [EcommerceDashboardComponent]
})
export class EcommerceDashboardModule { }
