import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceDashboardComponent } from './ecommerce.dashboard.component';
import { EcommerceDashboardRoutigModule } from './ecommerce.dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { KnobModule } from 'primeng/knob';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { ConferenceSelectorComponent } from '../../../selectors/conference-selector/conference-selector.component';

@NgModule({
	imports: [
    CommonModule,
    EcommerceDashboardRoutigModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ChartModule,
    KnobModule,
    SkeletonModule,
    ConferenceSelectorComponent
],
	declarations: [EcommerceDashboardComponent]
})
export class EcommerceDashboardModule { }
