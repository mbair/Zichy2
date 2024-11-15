import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConferenceComponent } from './conference.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConferenceComponent }
	])],
	exports: [RouterModule]
})
export class ConferenceRoutingModule { }
