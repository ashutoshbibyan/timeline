import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from './../models/notification';
import { Injectable } from '@angular/core';
import { UserSignUpModel } from '../form-data-models/user-signup-form-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  signUp(user: UserSignUpModel): Observable<Notification>{

    let url = "/api/user/signup";

    let body = user;

    return this.httpClient.post<Notification>(url , body );
  }
}
