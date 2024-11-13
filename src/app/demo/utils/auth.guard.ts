import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { CanActivateFn } from '@angular/router'
import { UserService } from '../service/user.service'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

export const AuthGuard: CanActivateFn = (route, state): Observable<boolean> => {
    const router = inject(Router)
    const userService = inject(UserService)
    const token = localStorage.getItem('token')

    // Check if the user is logged in
    if (!token) {
        router.navigate(['/auth/login'])
        return of(false)
    }

    const requiredRoles = route.data['requiredRoles'] || []

    // If no roles are required, allow access
    if (requiredRoles.length === 0) {
        return of(true)
    }

    // Check if the user has any of the required roles
    return userService.hasRole(requiredRoles).pipe(
        map(hasRole => {
            if (hasRole) {
                return true
            } else {
                router.navigate(['/auth/access'])
                return false
            }
        }),
        catchError(() => {
            router.navigate(['/auth/login'])
            return of(false)
        })
    )
}
