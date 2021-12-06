
import { Injectable } from "@angular/core";
import { HttpErrorResponse, HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from "../services/local-storage.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {

    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService
    ) { }

    // intercept(request: HttpRequest<any>, next: HttpHandler): any {
    //     const authToken = this.localStorageService.getJwtToken();
    //     const authReq = request.clone({ setHeaders: { Authorization: `bearer ${authToken}` } });
    //     return next.handle(authReq);
    // }

    /**
         * Intercept
         *
         * @param req
         * @param next
         */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        const authToken = this.localStorageService.getJwtToken();

        if (authToken && !this.localStorageService.isTokenExpired()) {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + authToken)
            });
        }

        // Response
        return next.handle(newReq).pipe(catchError((error) => {
            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401 || (error.url && error.url.includes("Account/Login"))) {
                    // Sign out
                    this.authService.logOut();
                    // Reload the app
                    // location.reload();
                }
            }

            return throwError(error);
        })
        );
    }
}


export const httpInterceptProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeadersInterceptor, multi: true }
];
