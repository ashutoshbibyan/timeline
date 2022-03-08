import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private httpClient: HttpClient) { }

  authenticate(userName: string , password: string): Observable<Notification>{

    let body = {userName : userName , password : password };

    return this.httpClient.post<Notification>("/api/login", body);

  }

}
