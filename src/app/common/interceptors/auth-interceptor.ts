import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //TO DO: to be removed
        console.log('testing the enviroment', environment.production)
        // appending the base url if the build is for prod
        let apiReq = req;
        if (environment.production) {
          const apiUrl = environment.apiUrl;
          apiReq = req.clone({ url: `${apiUrl}${req.url}` });
        }
        
        // Get the Bearer token from local storage or wherever you're storing it
        const token = localStorage.getItem('accessToken');

        // Clone the request to add the new header
        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(cloned);
        }

        // If there's no token, just pass the request along
        return next.handle(req);
    }
}