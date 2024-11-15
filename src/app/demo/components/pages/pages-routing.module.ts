import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'food-sensitivities', data: { breadcrumb: 'Étrendek' }, loadChildren: () => import('./food-sensitivities/food-sensitivities.module').then(m => m.FoodSensitivitiesModule) },
        { path: 'food-vouchers', data: { breadcrumb: 'Étel kuponok' }, loadChildren: () => import('./food-vouchers/food-vouchers.module').then(m => m.FoodVouchersModule) },
        { path: 'empty', data: { breadcrumb: 'Empty' }, loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'faq', data: { breadcrumb: 'FAQ' }, loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
        { path: 'help', data: { breadcrumb: 'Help' }, loadChildren: () => import('./help/help.module').then(m => m.HelpModule) },
        { path: 'invoice', data: { breadcrumb: 'Invoice' }, loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
