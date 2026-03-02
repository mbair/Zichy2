import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '../../service/auth.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [], imports: [CommonModule,
        AuthRoutingModule], providers: [AuthService, provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule { }
