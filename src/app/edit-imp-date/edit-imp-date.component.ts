import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DateService } from './../service/date.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { notEmpty } from '../custom_validators/not-empty-validator';
import { Importantdate } from '../models/importantdate';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-imp-date',
  templateUrl: './edit-imp-date.component.html',
  styleUrls: ['./edit-imp-date.component.css']
})
export class EditImpDateComponent implements OnInit {

  editFormGroup:FormGroup ;

  impDateId: string;

  impDate: Importantdate;

  constructor(private fb: FormBuilder , private dateService: DateService
    , private acRoute: ActivatedRoute , private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.acRoute.paramMap.subscribe((param) => {
      this.impDateId = param.get('id');
    });

    this.dateService.getImportantDate(this.impDateId).subscribe((res) => {
      this.impDate = res;
    });

    this.editFormGroup = this.fb.group({
      dateControl  : [moment(this.impDate.date).format('YYYY-MM-DD') , [ notEmpty()] ],
      titleControl : [this.impDate.title , [ notEmpty()] ]
    });


  }


  onSubmit(){

    this.impDate.date = moment(this.editFormGroup.controls['dateControl'].value).valueOf();
    this.impDate.title = this.editFormGroup.controls['titleControl'].value;

    this.dateService.updateImpDate(this.impDate).subscribe((res) => {
      if(res.successStatus){
        this.matSnackBar.open(res.notificationMsg , 'Success');
      }
      else if (res.errorStatus){
        this.matSnackBar.open(res.notificationMsg , 'Error');
      }
    });

  }

}
