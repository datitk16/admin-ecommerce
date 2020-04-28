import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { Auth } from 'src/app/shared/models/result-login.model';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl: string = Constants.CATALOG_URL + 'login';
  private cookiesUserKey = 'auth';
  private _token: string;
  private jwtHelper = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private cookieService: CookieService

  ) { }

  setUser(auth: Auth) {
    this.cookieService.set(this.cookiesUserKey, JSON.stringify(auth));
    this._token = auth.token;
    const decodeToken = this.jwtHelper.decodeToken(this._token);
    console.log(decodeToken)
  }

  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(this.loginUrl, { email, password });
  }
}
