import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConferenceFormComponent } from './conference-form.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConferenceFormComponent }
    ])],
    exports: [RouterModule]
})
export class ConferenceFormRoutingModule { }
