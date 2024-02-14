import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConferenceCreateComponent } from './conferencecreate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConferenceCreateComponent }
	])],
	exports: [RouterModule]
})
export class ConferenceCreateRoutingModule { }
