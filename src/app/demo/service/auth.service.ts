import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { tap, shareReplay, catchError } from "rxjs/operators";
import { ApiService } from "./api.service";
import * as moment from "moment";
import { throwError } from "rxjs";
moment.locale('hu')

@Injectable()
export class AuthService {

    public apiURL: string;

    constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
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
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        localStorage.removeItem("fullName")
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
        localStorage.setItem("token", authResult.headers.get('Authorization') || '')
        localStorage.setItem("userRole", authResult.body.userRole)
        localStorage.setItem("fullName", authResult.body.fullName)
    }

    private handleError(error: string) {
        return throwError(JSON.parse(JSON.stringify(error)))
    }
}