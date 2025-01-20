import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccessdeniedRoutingModule } from './accessdenied-routing.module';
import { AccessdeniedComponent } from './accessdenied.component'
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        AccessdeniedRoutingModule,
        ButtonModule,
        TranslateModule
    ],
    declarations: [AccessdeniedComponent]
})
export class AccessdeniedModule {}
