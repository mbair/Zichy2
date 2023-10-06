import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VendegekComponent } from './vendegek.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VendegekComponent }
	])],
	exports: [RouterModule]
})
export class VendegekRoutingModule { }
