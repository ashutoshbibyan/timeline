import { MatSnackBar } from '@angular/material/snack-bar';
import { WhtsAppChatForm } from './../models/whtsAppChatForm';
import { WhtsappchatService } from './../service/whtsappchat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { notEmpty } from '../custom_validators/not-empty-validator';
import { RxwebValidators} from '@rxweb/reactive-form-validators';
import * as moment from 'moment';

@Component({
  selector: 'app-addwhtsappchat',
  templateUrl: './addwhtsappchat.component.html',
  styleUrls: ['./addwhtsappchat.component.css']
})
export class AddwhtsappchatComponent implements OnInit {

  whtsappChatForm: FormGroup ;

  chatFile: File = new File(['file'] , 'file.txt');

  constructor(private fb: FormBuilder , private whtAppChatService:  WhtsappchatService , private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.whtsappChatForm = this.fb.group({
      chatTitle : ['' , [ notEmpty()]] ,
      chatDate  : ['' , [ notEmpty()]] ,
      chatFile  : ['' , [Validators.required , RxwebValidators.extension({extensions: ['txt']})]]
    });
  }

  updateFile(files: any){

     this.chatFile = files.item(0);

  }

  onSubmit(){

    let chatTitle = this.whtsappChatForm.controls['chatTitle'].value;
    let chatDate  = moment(this.whtsappChatForm.controls['chatDate'].value , 'YYYY-MM-DD').valueOf();



    let formData: WhtsAppChatForm = {chatTitle , chatDate , chatFile : this.chatFile};
    this.whtAppChatService.addWhtsAppChat(formData).subscribe((res) => {
      if(res.successStatus){
        this.matSnackBar.open(res.notificationMsg , 'Success');
      }
      else{
        this.matSnackBar.open(res.notificationMsg , "Error");
      }
    });
  }

}
