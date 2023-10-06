import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodVouchersComponent } from './food-vouchers.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FoodVouchersComponent }
	])],
	exports: [RouterModule]
})
export class FoodVouchersRoutingModule { }
