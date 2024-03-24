import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EtelekComponent } from './etelek.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EtelekComponent }
	])],
	exports: [RouterModule]
})
export class EtelekRoutingModule { }
