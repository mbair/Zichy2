import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { CanActivateFn } from '@angular/router'
import { AuthService } from '../service/auth.service'
import { UserService } from '../service/user.service'
import { SessionService } from '../service/session.service'
import { Observable, of } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'

export const AuthGuard: CanActivateFn = (route, state): Observable<boolean> => {
    const router = inject(Router)
    const authService = inject(AuthService)
    const userService = inject(UserService)
    const sessionService = inject(SessionService)
    const ensureAuthenticated$ = sessionService.hasActiveSessionSnapshot()
        ? of(sessionService.isSessionActive())
        : authService.restoreSessionFromCookie$()

    const requiredRoles = route.data['requiredRoles'] || []

    return ensureAuthenticated$.pipe(
        switchMap((isAuthenticated) => {
            if (!isAuthenticated) {
                router.navigate(['/auth/login'])
                return of(false)
            }

            if (requiredRoles.length === 0) {
                return of(true)
            }

            return userService.hasRole(requiredRoles).pipe(
                map(hasRole => {
                    if (hasRole) {
                        return true
                    }

                    router.navigate(['/auth/access'])
                    return false
                }),
                catchError(() => {
                    router.navigate(['/auth/login'])
                    return of(false)
                })
            )
        }),
        catchError(() => {
            router.navigate(['/auth/login'])
            return of(false)
        })
    )
}
