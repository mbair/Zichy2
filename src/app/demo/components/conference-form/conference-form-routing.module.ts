import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConferenceFormComponent } from './conference-form.component';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ConferenceFormComponent },
        ]),
        MessagesModule
    ],
    exports: [RouterModule]
})
export class ConferenceFormRoutingModule { }
