import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodCounterComponent } from './food-counter.component';
import { MessageModule } from 'primeng/message';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FoodCounterComponent },
        ]),
        MessageModule
    ],
    exports: [RouterModule]
})
export class FoodCounterRoutingModule { }
