import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodSensitivitiesComponent } from './food-sensitivities.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FoodSensitivitiesComponent }
	])],
	exports: [RouterModule]
})
export class FoodSensitivitiesRoutingModule { }
