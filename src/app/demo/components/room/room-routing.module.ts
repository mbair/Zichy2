import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomComponent } from './room.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RoomComponent }
	])],
	exports: [RouterModule]
})
export class RoomRoutingModule { }
