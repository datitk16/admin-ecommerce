import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/Customer.model';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //chia dang nhap customer va admin
  private loginUrl: string = Constants.CATALOG_URL;
  constructor(
    private http: HttpClient

  ) { }

  login(email: string, password: string): Observable<Customer> {
    return this.http.post<Customer>(this.loginUrl, { email, password })
  }
}
