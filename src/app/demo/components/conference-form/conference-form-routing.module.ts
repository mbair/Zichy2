import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConferenceFormComponent } from './conference-form.component';
import { MessageModule } from 'primeng/message';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ConferenceFormComponent },
        ]),
        MessageModule
    ],
    exports: [RouterModule]
})
export class ConferenceFormRoutingModule { }
