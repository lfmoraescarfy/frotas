import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let currentUser = this.authenticationService.currentUser();
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    "Authorization": `Bearer ${currentUser.token}`,
                    "Access-Control-Allow-Origin": `*`
                },
            });
        }

        return next.handle(request);
    }
}
