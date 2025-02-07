import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitchenCalendarComponent } from './kitchen-calendar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: KitchenCalendarComponent }
	])],
	exports: [RouterModule]
})
export class KitchenCalendarRoutingModule { }
