import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodCounterComponent } from './food-counter.component';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FoodCounterComponent },
        ]),
        MessagesModule
    ],
    exports: [RouterModule]
})
export class FoodCounterRoutingModule { }
