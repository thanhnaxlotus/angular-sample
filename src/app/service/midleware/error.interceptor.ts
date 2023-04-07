import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if ([401].includes(err.status)) {
        //call api refresh token
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
