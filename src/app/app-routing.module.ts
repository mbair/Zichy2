import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'rfid-tag', data: { breadcrumb: 'RFID címke' }, loadChildren: () => import('./demo/components/rfid-tag/rfid-tag.module').then(m => m.RFIDTagModule) },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'conference', data: { breadcrumb: 'Konferenciák' }, loadChildren: () => import('./demo/components/conference/conference.module').then(m => m.ConferenceModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'logs', data: { breadcrumb: 'Logok' }, loadChildren: () => import('./demo/components/logs/logs.module').then(m => m.LogsModule) },
            { path: 'guest', data: { breadcrumb: 'Vendégek' }, loadChildren: () => import('./demo/components/vendegek/vendegek.module').then(m => m.VendegekModule) },
            { path: 'room', data: { breadcrumb: 'Szobák' }, loadChildren: () => import('./demo/components/szobak/szobak.module').then(m => m.SzobakModule) },
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'conference-form', loadChildren: () => import('./demo/components/conference-form/conference-form.module').then(m => m.ConferenceFormModule) },
    { path: 'food-counter', loadChildren: () => import('./demo/components/food-counter/food-counter.module').then(m => m.FoodCounterModule) },

    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
