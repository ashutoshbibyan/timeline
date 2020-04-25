import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor() { }

  authenticate(userName: string , password: string): boolean{

    return false ;

  }

}
