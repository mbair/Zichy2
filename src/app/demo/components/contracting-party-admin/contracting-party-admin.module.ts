import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ContractingPartyAdminRoutingModule } from './contracting-party-admin-routing.module';
import { ContractingPartyAdminComponent } from './contracting-party-admin.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ContractingPartyAdminRoutingModule,
        BlockUIModule,
        ButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        RippleModule,
        TableModule,
        TagModule,
        TooltipModule,
    ],
    declarations: [ContractingPartyAdminComponent]
})
export class ContractingPartyAdminModule { }
