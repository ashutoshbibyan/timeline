import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from "@angular/forms";
import { DateService } from '../service/date.service';
import { Importantdate } from '../models/importantdate';
import { Notification } from '../models/notification';
import { notEmpty } from '../custom_validators/not-empty-validator';

@Component({
  selector: 'app-add-imp-date',
  templateUrl: './add-imp-date.component.html',
  styleUrls: ['./add-imp-date.component.css']
})
export class AddImpDateComponent implements OnInit {

  formGroupAddImpDate: FormGroup;

  notification: Notification ;

  constructor(private formBuilder: FormBuilder , private dateService: DateService) { }

  ngOnInit(): void {

    this.formGroupAddImpDate = this.formBuilder.group({

      impdate:["" , [Validators.required]],
      imptitle:["" , [notEmpty()]]

    });

  }

  onSubmit(){
     const date = this.formGroupAddImpDate.controls['impdate'].value;
     const title = this.formGroupAddImpDate.controls['imptitle'].value;

     const impDate: Importantdate = {date: date , title: title} ;
     this.dateService.addImpDate(impDate).subscribe((notification) =>{
       this.notification = notification ;
     });

  }

}
