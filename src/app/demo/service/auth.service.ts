import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, shareReplay } from "rxjs/operators";
import { ApiService } from "./api.service";
import * as moment from "moment";
moment.locale('hu')

@Injectable()
export class AuthService {

    apiURL: string;

    constructor(private http: HttpClient, private apiService: ApiService) {
        // Set API URL
        this.apiURL = this.apiService.apiURL
    }

    public login(email: string, password: string) {
        return this.http.post<any>(`${this.apiURL}/users/login`, { email, password }, {observe: 'response'})
            .pipe(
                tap(response => {
                    const result =  response.body;
                    this.setSession(result);
                    const authHeader = response.headers.get('Authorization');
                    console.log(authHeader);
                }),
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
        const expiresAt = moment().add(authResult.expiresIn, 'second')
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
    }

    private getExpiration() {
        const expiration = localStorage.getItem("expires_at")
        const expiresAt = expiration ? JSON.parse(expiration) : null
        return moment(expiresAt)
    }
}
