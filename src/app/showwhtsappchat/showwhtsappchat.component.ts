import { WhtsappchatService } from './../service/whtsappchat.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WhtsAppChat } from '../models/whtsAppChat';

@Component({
  selector: 'app-showwhtsappchat',
  templateUrl: './showwhtsappchat.component.html',
  styleUrls: ['./showwhtsappchat.component.css']
})
export class ShowwhtsappchatComponent implements OnInit {

  chatId: string ;

  chatDate: string ;

  whtsAppChat: Observable<WhtsAppChat[]>;

  constructor(private acRoute: ActivatedRoute , private whtsAppChatService: WhtsappchatService) { }

  ngOnInit(): void {

    this.acRoute.paramMap.subscribe((param) => {
      this.chatId = param.get('id');
      this.chatDate = param.get('date');
    });

    this.whtsAppChat = this.whtsAppChatService.getWhtsAppChat(this.chatId ,this.chatDate);

  }

}
