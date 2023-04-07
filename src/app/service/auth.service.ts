import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { USER_KEY } from "../constant/localstorageKey";
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem(USER_KEY) || '{}') as User);

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
    return this.http.post<any>(`login`, {
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
