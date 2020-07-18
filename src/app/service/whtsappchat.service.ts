import { WhtsAppChatForm } from './../models/whtsAppChatForm';
import { Notification } from './../models/notification';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WhtsAppChat } from '../models/whtsAppChat';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class WhtsappchatService {

  constructor() { }


  addWhtsAppChat(whtsAppChatForm: WhtsAppChatForm): Observable<Notification>{
    return null;
  }


  getWhtsAppChat(chatId: string , chatDate: string) : Observable<WhtsAppChat[]>{
    return null;
  }

  getAllChats(): Observable<Chat[]>{
    return null ;
  }

  deleteChat(chatId : string): Observable<Notification>{

    return null ;

  }
}
