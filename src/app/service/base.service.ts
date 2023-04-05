import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class BaseService implements HttpInterceptor {
  constructor(private authService: AuthService, private http: HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const account = this.authService.getUser;
    const isLoggedIn = account.accessToken;
    const baseUrl = environment.baseUrl;
    if (isLoggedIn && baseUrl) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${account.accessToken}` },
        url: `${baseUrl}/${req.url}`
      });
    }
    return next.handle(req)
  }
}
