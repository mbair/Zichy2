import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SzobakComponent } from './szobak.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SzobakComponent }
	])],
	exports: [RouterModule]
})
export class SzobakRoutingModule { }
