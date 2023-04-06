import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../../models/user';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if ([401].includes(err.status)) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.authService.getUser.accessToken}`
              }
            });
            return next.handle(request)
          }),
          catchError(() => {
            this.authService.logout();
            return throwError('Unauthorized');
          })
        )
      }
      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    }))
  }
}
