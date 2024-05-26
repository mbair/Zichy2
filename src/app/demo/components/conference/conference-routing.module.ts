import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Lista'}, loadChildren: () => import('./conferencelist.module').then(m => m.ConferenceListModule) },
        { path: 'create', data: {breadcrumb: 'Új konferencia'}, loadChildren: () => import('./create/conferencecreate.module').then(m => m.ConferenceCreateModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ConferenceRoutingModule { }
