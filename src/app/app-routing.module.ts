import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './demo/utils/auth.guard';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
}

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            // Need Authentication
            { path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule), canActivate: [AuthGuard] },
            { path: 'rfid-tag', data: { breadcrumb: 'RFID címke' }, loadChildren: () => import('./demo/components/rfid-tag/rfid-tag.module').then(m => m.RFIDTagModule), canActivate: [AuthGuard] },
            { path: 'user', data: { breadcrumb: 'Felhasználók' }, loadChildren: () => import('./demo/components/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
            { path: 'conference', data: { breadcrumb: 'Konferenciák' }, loadChildren: () => import('./demo/components/conference/conference.module').then(m => m.ConferenceModule), canActivate: [AuthGuard] },
            { path: 'profile', data: { breadcrumb: 'Profil' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule), canActivate: [AuthGuard] },
            { path: 'logs', data: { breadcrumb: 'Logok' }, loadChildren: () => import('./demo/components/logs/logs.module').then(m => m.LogsModule), canActivate: [AuthGuard] },
            { path: 'guest', data: { breadcrumb: 'Vendégek' }, loadChildren: () => import('./demo/components/vendegek/vendegek.module').then(m => m.VendegekModule), canActivate: [AuthGuard] },
            { path: 'room', data: { breadcrumb: 'Szobák' }, loadChildren: () => import('./demo/components/szobak/szobak.module').then(m => m.SzobakModule), canActivate: [AuthGuard] },
        ]
    },

    // Don't need Authentication
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
