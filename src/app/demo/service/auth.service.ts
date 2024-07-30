import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, shareReplay } from 'rxjs/operators'
import { User } from "../api/user";
import * as moment from "moment";
moment.locale('hu')

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public login(email: string, password: string) {
        return this.http.post<User>('/api/login', { email, password })
            .pipe(
                tap(authResult => this.setSession(authResult)),
                // this is just the HTTP call,
                // we still need to handle the reception of the token
                shareReplay()
            )
    }

    public logout() {
        localStorage.removeItem("id_token")
        localStorage.removeItem("expires_at")
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration())
    }

    public isLoggedOut() {
        return !this.isLoggedIn()
    }

    private setSession(authResult: any) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
    }

    private getExpiration() {
        const expiration = localStorage.getItem("expires_at")
        const expiresAt = expiration ? JSON.parse(expiration) : null
        return moment(expiresAt)
    }
}
