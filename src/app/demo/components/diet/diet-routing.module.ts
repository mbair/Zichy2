import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DietComponent } from './diet.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DietComponent }
	])],
	exports: [RouterModule]
})
export class DietRoutingModule { }
