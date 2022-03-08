import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WhtsappchatService } from './../service/whtsappchat.service';
import { Chat } from './../models/chat';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { of } from 'rxjs';


@Component({
  selector: 'app-showallchats',
  templateUrl: './showallchats.component.html',
  styleUrls: ['./showallchats.component.css']
})
export class ShowallchatsComponent implements OnInit {

  chats: Observable<Chat[]>;

  constructor(private whtsAppChatService: WhtsappchatService , private matSnackBar: MatSnackBar ,
    private router: Router) { }

  ngOnInit(): void {

   // this.chats = this.whtsAppChatService.getAllChats();

   const chatsStub = [{chatDate: moment.now() , chatTitle: ' test title one ' , chatId: 'test chat id ' } ,
   {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'} ,
   {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'},
   {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'},
   {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'},
   {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'},
   {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'},
   {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'}];
    this.chats = of(chatsStub);
  }

  edit(chatId: string){

    let url = `/chat/edit/${chatId}`;

    this.router.navigateByUrl(url);

  }

  delete(chatId : string){

    this.whtsAppChatService.deleteChat(chatId).subscribe((res)=>{
      if(res.successStatus){
        this.matSnackBar.open(res.notificationMsg ,'Success');
      }

      else if (res.errorStatus) {
        this.matSnackBar.open(res.notificationMsg ,'Error');
      }

    });

  }

}
