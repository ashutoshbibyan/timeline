import { WhtsAppChatForm } from './../models/whtsAppChatForm';
import { Notification } from './../models/notification';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhtsappchatService {

  constructor() { }


  addWhtsAppChat(whtsAppChatForm: WhtsAppChatForm): Observable<Notification>{
    return null;
  }
}
