import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const token = localStorage.getItem('token')

    // Check the validity of the token (e.g. decoding, checking the expiration date)
    if (token) {
        return true

    // If there is no token, redirect to the login page
    } else {
        router.navigate(['/auth/login'])
        return false
    }
}
