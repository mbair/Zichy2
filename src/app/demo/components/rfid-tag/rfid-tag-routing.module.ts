import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RFIDTagComponent } from './rfid-tag.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RFIDTagComponent }
	])],
	exports: [RouterModule]
})
export class RFIDTagRoutingModule { }
