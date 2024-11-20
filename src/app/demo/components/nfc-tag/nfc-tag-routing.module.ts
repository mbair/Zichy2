import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NFCTagComponent } from './nfc-tag.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NFCTagComponent }
	])],
	exports: [RouterModule]
})
export class NFCTagRoutingModule { }
