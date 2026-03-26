import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HELP_SIDEBAR_CONTENT } from 'src/app/layout/help/help-sidebar-content.data';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: { breadcrumb: 'Vezérlőpult', helpSidebar: HELP_SIDEBAR_CONTENT.dashboard }, loadChildren: () => import('./ecommerce/ecommerce.dashboard.module').then(m => m.EcommerceDashboardModule) },
        { path: 'dashboard-banking', data: { breadcrumb: 'Banking Dashboard', helpSidebar: HELP_SIDEBAR_CONTENT.dashboardBanking }, loadChildren: () => import('./banking/banking.dashboard.module').then(m => m.BankingDashboardModule) }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
