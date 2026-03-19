import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HELP_SIDEBAR_CONTENT } from 'src/app/layout/help/help-sidebar-content.data';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', data: { breadcrumb: 'Empty', helpSidebar: HELP_SIDEBAR_CONTENT.pagesEmpty }, loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'faq', data: { breadcrumb: 'FAQ', helpSidebar: HELP_SIDEBAR_CONTENT.pagesFaq }, loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
        { path: 'help', data: { breadcrumb: 'Help', helpSidebar: HELP_SIDEBAR_CONTENT.pagesHelp }, loadChildren: () => import('./help/help.module').then(m => m.HelpModule) },
        { path: 'invoice', data: { breadcrumb: 'Invoice', helpSidebar: HELP_SIDEBAR_CONTENT.pagesInvoice }, loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
