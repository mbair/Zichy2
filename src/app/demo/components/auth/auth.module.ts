import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '../../service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule
    ],
    providers: [AuthService]
})
export class AuthModule { }
