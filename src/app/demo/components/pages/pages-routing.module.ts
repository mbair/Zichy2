import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'konferenciak', loadChildren: () => import('./konferenciak/konferenciak.module').then(m => m.KonferenciakModule) },
        { path: 'vendegek', loadChildren: () => import('./vendegek/vendegek.module').then(m => m.VendegekModule) },
        { path: 'szobak', loadChildren: () => import('./szobak/szobak.module').then(m => m.SzobakModule) },
        { path: 'etelek', loadChildren: () => import('./etelek/etelek.module').then(m => m.EtelekModule) },
        { path: 'food-sensitivities', loadChildren: () => import('./food-sensitivities/food-sensitivities.module').then(m => m.FoodSensitivitiesModule) },
        { path: 'food-vouchers', loadChildren: () => import('./food-vouchers/food-vouchers.module').then(m => m.FoodVouchersModule) },
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
