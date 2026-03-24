import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, shareReplay, catchError, finalize, map } from "rxjs/operators";
import { ApiService } from "./api.service";
import { UserService } from "./user.service";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { SessionService } from "./session.service";
import { AuthStorageService } from "./auth-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public apiURL: string;
    private restoreSessionInFlight$?: Observable<boolean>;

    constructor(private http: HttpClient, 
                private apiService: ApiService, 
                private userService: UserService,
                private sessionService: SessionService,
                private authStorage: AuthStorageService) {

        // Set API URL
        this.apiURL = this.apiService.apiURL
    }

    public login(email: string, password: string) {
        return this.http.post<any>(`${this.apiURL}/users/login`, { email, password }, { observe: 'response', withCredentials: true })
            .pipe(
                tap(response => this.setSession(response)),
                shareReplay(),
                catchError(this.handleError)
            )
    }

    public logout() {
        this.logoutServerSession$()
            .pipe(
                finalize(() => this.sessionService.logout()),
            )
            .subscribe()
    }

    public revokeServerSessionSilently(): void {
        this.logoutServerSession$()
            .pipe(catchError(() => EMPTY))
            .subscribe()
    }

    public passwordReset(email: string) {
        return this.http.get<any>(`${this.apiURL}/users/forgotpassrequest/${email}`, { observe: 'response' })
            .pipe(
                tap(response => console.log(response)),
                shareReplay(),
                catchError(this.handleError)
            )
    }

    public passwordRenew(password: string) {
        // TODO: set correct api endpoint
        return this.http.get<any>(`${this.apiURL}/users/xxxxxxxxxxxxx/${password}`, { observe: 'response' })
            .pipe(
                tap(response => console.log(response)),
                shareReplay(),
                catchError(this.handleError)
            )
    }

    public restoreSessionFromCookie$(): Observable<boolean> {
        if (this.restoreSessionInFlight$) {
            return this.restoreSessionInFlight$
        }

        this.restoreSessionInFlight$ = this.http.get<any>(`${this.apiURL}/users/getowndata`, { observe: 'response', withCredentials: true })
            .pipe(
                tap(response => this.setSession(response)),
                map(() => true),
                catchError(() => of(false)),
                tap((result) => {
                    if (result === false) {
                        this.authStorage.clearAuthSession()
                    }
                }),
                finalize(() => {
                    this.restoreSessionInFlight$ = undefined
                }),
                shareReplay(1)
            )

        return this.restoreSessionInFlight$
    }

    private setSession(authResult: any) {
        this.sessionService.updateSessionFromResponse(authResult)
        this.authStorage.setProfileFields({
            userid: authResult.body.id,
            fullname: authResult.body.fullname,
            email: authResult.body.email,
            phone: authResult.body.phone,
            userrole: authResult.body.role,
            user_rolesid: authResult.body.user_rolesid,
        })

        // Update user role
        this.userService.updateUserRole(authResult.body.role)
    }

    private handleError(error: string) {
        return throwError(JSON.parse(JSON.stringify(error)))
    }

    private logoutServerSession$() {
        return this.http.post(`${this.apiURL}/users/logout`, {}, { observe: 'response', withCredentials: true })
            .pipe(catchError(() => EMPTY))
    }
}
