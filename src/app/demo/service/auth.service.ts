import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, shareReplay, catchError, finalize } from "rxjs/operators";
import { ApiService } from "./api.service";
import { UserService } from "./user.service";
import { EMPTY, throwError } from "rxjs";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public apiURL: string;

    constructor(private http: HttpClient, 
                private apiService: ApiService, 
                private userService: UserService,
                private sessionService: SessionService) {

        // Set API URL
        this.apiURL = this.apiService.apiURL
    }

    public login(email: string, password: string) {
        return this.http.post<any>(`${this.apiURL}/users/login`, { email, password }, { observe: 'response' })
            .pipe(
                tap(response => this.setSession(response)),
                shareReplay(),
                catchError(this.handleError)
            )
    }

    public logout() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.sessionService.logout()
            return
        }

        this.http.post(`${this.apiURL}/users/logout`, {}, { observe: 'response' })
            .pipe(
                finalize(() => this.sessionService.logout()),
                catchError(() => EMPTY)
            )
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

    private setSession(authResult: any) {
        this.sessionService.updateSessionFromResponse(authResult)
        localStorage.setItem("userid", authResult.body.id)
        localStorage.setItem("fullname", authResult.body.fullname)
        localStorage.setItem("email", authResult.body.email)
        localStorage.setItem("phone", authResult.body.phone)
        localStorage.setItem("userrole", authResult.body.role)
        localStorage.setItem("user_rolesid", authResult.body.user_rolesid)

        // Update user role
        this.userService.updateUserRole(authResult.body.role)
    }

    private handleError(error: string) {
        return throwError(JSON.parse(JSON.stringify(error)))
    }
}
