import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuestComponent } from './guest.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: GuestComponent }
	])],
	exports: [RouterModule]
})
export class GuestRoutingModule { }
