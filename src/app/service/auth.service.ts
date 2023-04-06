import { Injectable, Input } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { USER_KEY } from "../constant/localstorageKey";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  private baseUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem(USER_KEY) || '{}') as User);
    this.baseUrl = environment.baseUrl;
  }

  public get getUser() {
    return this.userSubject.value;
  }
  public setUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    this.userSubject.next(user)
  }
  loginApi(username: string, password: string) {
    // on success the api returns an account object with a JWT auth token
    return this.http.post<any>(`${this.baseUrl}/login`, {
      username,
      password
    }).pipe(map(account => {
      this.userSubject.next(account);
      this.handleLogin();
      return account;
    }));
  }

  logout() {
    localStorage.removeItem(USER_KEY);
    this.userSubject.next({} as User)
    this.router.navigate(['/auth/login'])
  }

  refreshToken() {
    const user = this.getUser;
    return this.http.post<{ accessToken: string }>(`renew-token`, {
      refreshToken: user.refreshToken
    }).pipe(map(data => {
      this.setUser({ ...user, accessToken: data.accessToken })
    }))
  }
  private handleLogin() {
    const user = this.getUser || {} as User
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}
