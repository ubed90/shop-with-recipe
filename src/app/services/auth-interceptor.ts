import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), //Automatically Unsubscribes the First User Observable on First Emission
      exhaustMap((user) => { // Waits Until User OBS Emits data and starts Another OBS
        if (!user) {  
          return next.handle(req); //If User is Not Authenticated we will not attach token
        }

        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user?.token as string), //If User is Authenticated we will attach token
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
