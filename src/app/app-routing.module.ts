import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './demo/utils/auth.guard';
import { APOLLO_ROUTES } from './apollo/apollo-routes';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    useHash: true
};

const LEGACY_PARAM_PATTERNS = [':a', ':a/:b', ':a/:b/:c'] as const;

function createLegacyPrefixRedirects(legacyPrefix: string, apolloPrefix: string, defaultTarget: string): Routes {
    return [
        { path: legacyPrefix, redirectTo: defaultTarget, pathMatch: 'full' },
        ...LEGACY_PARAM_PATTERNS.map((params) => ({
            path: `${legacyPrefix}/${params}`,
            redirectTo: `${apolloPrefix}/${params}`
        }))
    ];
}

const apolloRoutes: Routes = [
    { path: 'apollo/auth', redirectTo: APOLLO_ROUTES.auth.login, pathMatch: 'full' },
    { path: 'apollo/auth', loadChildren: () => import('./pages/auth/auth.routes') },
    { path: 'apollo/landing', loadComponent: () => import('./pages/landing/landing').then((c) => c.Landing) },
    { path: 'apollo/notfound', loadComponent: () => import('./pages/notfound/notfound').then((c) => c.Notfound) },
    ...createLegacyPrefixRedirects('apps', APOLLO_ROUTES.apps.root, APOLLO_ROUTES.apps.chat),
    { path: 'apollo-dashboard', redirectTo: APOLLO_ROUTES.root, pathMatch: 'full' },
    { path: 'apollo-dashboard-banking', redirectTo: APOLLO_ROUTES.dashboardBanking, pathMatch: 'full' },
    ...createLegacyPrefixRedirects('apollo-uikit', APOLLO_ROUTES.uikit.root, APOLLO_ROUTES.uikit.formLayout),
    { path: 'apollo-blocks', redirectTo: APOLLO_ROUTES.blocks, pathMatch: 'full' },
    ...createLegacyPrefixRedirects('apollo-ecommerce', APOLLO_ROUTES.ecommerce.root, APOLLO_ROUTES.ecommerce.productList),
    ...createLegacyPrefixRedirects('apollo-pages', APOLLO_ROUTES.pages.root, APOLLO_ROUTES.pages.documentation),
    ...createLegacyPrefixRedirects('apollo-profile', APOLLO_ROUTES.profile.root, APOLLO_ROUTES.profile.list),
    ...createLegacyPrefixRedirects('apollo-auth', APOLLO_ROUTES.pages.authRoot, APOLLO_ROUTES.auth.login),
    { path: 'apollo-landing', redirectTo: APOLLO_ROUTES.landing, pathMatch: 'full' },
    { path: 'apollo-notfound', redirectTo: APOLLO_ROUTES.notFound, pathMatch: 'full' },
    {
        path: 'apollo',
        loadComponent: () => import('./layout/components/app.layout').then((c) => c.AppLayout),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Apollo Design Demo',
            demoOnly: true,
            requiredRoles: ['Super Admin', 'Nagy Admin']
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/dashboards/ecommercedashboard').then((c) => c.EcommerceDashboard)
            },
            {
                path: 'dashboard-banking',
                loadComponent: () => import('./pages/dashboards/bankingdashboard').then((c) => c.BankingDashboard)
            },
            {
                path: 'documentation',
                loadComponent: () => import('./pages/documentation/documentation').then((c) => c.Documentation)
            },
            {
                path: 'uikit',
                redirectTo: 'uikit/formlayout',
                pathMatch: 'full'
            },
            {
                path: 'uikit',
                loadChildren: () => import('./pages/uikit/uikit.routes')
            },
            {
                path: 'blocks',
                loadChildren: () => import('./pages/blocks/blocks.routes')
            },
            {
                path: 'ecommerce',
                redirectTo: 'ecommerce/product-list',
                pathMatch: 'full'
            },
            {
                path: 'ecommerce',
                loadChildren: () => import('./pages/ecommerce/ecommerce.routes')
            },
            {
                path: 'pages',
                redirectTo: 'pages/documentation',
                pathMatch: 'full'
            },
            {
                path: 'pages',
                loadChildren: () => import('./pages/pages.routes')
            },
            {
                path: 'apps',
                redirectTo: 'apps/chat',
                pathMatch: 'full'
            },
            {
                path: 'apps',
                loadChildren: () => import('./apps/apps.routes')
            },
            {
                path: 'profile',
                redirectTo: 'profile/list',
                pathMatch: 'full'
            },
            {
                path: 'profile',
                loadChildren: () => import('./pages/usermanagement/usermanagement.routes')
            },
            {
                path: '**',
                redirectTo: APOLLO_ROUTES.notFound
            }
        ]
    }
];

const protectedRoutes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            {
                path: 'dev/localized-date-picker',
                loadComponent: () => import('./devtools/localized-date-picker-debug.component').then(m => m.LocalizedDatePickerDebugComponent)
            },
            // Need Authentication
            { 
                path: '', 
                loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'nfc-tag', 
                data: { 
                    breadcrumb: 'NFC címke',
                    requiredRoles: ['Super Admin', 'Nagy Admin']
                }, 
                loadChildren: () => import('./demo/components/nfc-tag/nfc-tag.module').then(m => m.NFCTagModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'user', 
                data: { 
                    breadcrumb: 'Felhasználó',
                    requiredRoles: ['Super Admin', 'Nagy Admin']
                }, 
                loadChildren: () => import('./demo/components/user/user.module').then(m => m.UserModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'pages', 
                data: { 
                    breadcrumb: 'Pages' 
                }, 
                loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'reservation', 
                data: { 
                    breadcrumb: 'Foglalás',
                    // requiredRoles: ['Super Admin', 'Nagy Admin']
                }, 
                loadChildren: () => import('./demo/components/reservation/reservation.module').then(m => m.ReservationModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'conference', 
                data: { 
                    breadcrumb: 'Konferencia'
                }, 
                loadChildren: () => import('./demo/components/conference/conference.module').then(m => m.ConferenceModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'profile', 
                data: { 
                    breadcrumb: 'Profil'
                }, 
                loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'documentation', 
                data: { 
                    breadcrumb: 'Documentation'
                }, 
                loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'logs', 
                data: { 
                    breadcrumb: 'Napló',
                    requiredRoles: ['Super Admin', 'Nagy Admin']
                }, 
                loadChildren: () => import('./demo/components/logs/logs.module').then(m => m.LogsModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'guest', 
                data: { 
                    breadcrumb: 'Vendég' 
                }, 
                loadChildren: () => import('./demo/components/guest/guest.module').then(m => m.GuestModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'room', 
                data: { 
                    breadcrumb: 'Szoba',
                    requiredRoles: []
                }, 
                loadChildren: () => import('./demo/components/room/room.module').then(m => m.RoomModule), 
                canActivate: [AuthGuard] 
            },
            { 
                path: 'diet', 
                data: { 
                    breadcrumb: 'Étrend',
                    requiredRoles: ['Super Admin', 'Nagy Admin']
                }, 
                loadChildren: () => import('./demo/components/diet/diet.module').then(m => m.DietModule), 
                canActivate: [AuthGuard] 
            }
        ]
    }
];

const publicRoutes: Routes = [
    // Don't need Authentication
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'conference-form/:formUrl', loadChildren: () => import('./demo/components/conference-form/conference-form.module').then(m => m.ConferenceFormModule) },
    { path: 'food-counter', loadChildren: () => import('./demo/components/food-counter/food-counter.module').then(m => m.FoodCounterModule) },
    { path: 'kitchen-calendar', loadChildren: () => import('./demo/components/kitchen-calendar/kitchen-calendar.module').then(m => m.KitchenCalendarModule) },

    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

const routes: Routes = [...apolloRoutes, ...protectedRoutes, ...publicRoutes];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
