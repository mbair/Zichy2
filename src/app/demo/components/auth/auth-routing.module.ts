import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HELP_SIDEBAR_CONTENT } from 'src/app/layout/help/help-sidebar-content.data';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authError }, loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authAccess }, loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
        { path: 'login', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authLogin }, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'forgotpassword', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authForgotPassword }, loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
        { path: 'register', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authRegister }, loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
        { path: 'newpassword', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authNewPassword }, loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule) },
        { path: 'verification', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authVerification }, loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
        { path: 'lockscreen', data: { helpSidebar: HELP_SIDEBAR_CONTENT.authLockscreen }, loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
