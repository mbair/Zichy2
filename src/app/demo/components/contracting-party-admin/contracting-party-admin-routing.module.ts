import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContractingPartyAdminComponent } from './contracting-party-admin.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ContractingPartyAdminComponent }
    ])],
    exports: [RouterModule]
})
export class ContractingPartyAdminRoutingModule { }
