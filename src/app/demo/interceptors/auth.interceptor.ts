import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionService } from "../service/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("token")

        if (token && this.sessionService.hasActiveSessionSnapshot() && !this.isPublicAuthRequest(req.url)) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            })

            return next.handle(cloned)
        }
        else {
            return next.handle(req)
        }
    }

    private isPublicAuthRequest(url: string): boolean {
        return url.includes('/users/login') || url.includes('/users/forgotpassrequest/')
    }
}
