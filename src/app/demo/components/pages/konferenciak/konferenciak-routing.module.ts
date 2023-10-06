import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KonferenciakComponent } from './konferenciak.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: KonferenciakComponent }
	])],
	exports: [RouterModule]
})
export class KonferenciakRoutingModule { }
