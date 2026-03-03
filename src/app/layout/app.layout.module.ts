import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';

import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from './config/app.config.module';
import { AppLayoutComponent } from './app.layout.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppProfileSidebarComponent } from './app.profilesidebar.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@NgModule({ declarations: [
        AppLayoutComponent,
        AppBreadcrumbComponent,
        AppSidebarComponent,
        AppTopbarComponent,
        AppProfileSidebarComponent,
        AppMenuComponent,
        AppMenuitemComponent
    ], imports: [CommonModule,
        FormsModule,
        InputTextModule,
        DrawerModule,
        BadgeModule,
        RadioButtonModule,
        
        ButtonModule,
        TooltipModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        TagModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppLayoutModule { }
