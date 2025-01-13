import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConferenceListComponent } from './conferencelist.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConferenceListComponent }
	])],
	exports: [RouterModule]
})
export class ConferenceListRoutingModule { }
