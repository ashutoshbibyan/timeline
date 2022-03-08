import { AddTimelineFormModel } from './../form-data-models/add-timeline-form-model';
import { TimelineService } from './../service/timeline.service';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { notEmpty } from '../custom_validators/not-empty-validator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addtimeline',
  templateUrl: './addtimeline.component.html',
  styleUrls: ['./addtimeline.component.css']
})
export class AddtimelineComponent implements OnInit {

  timelineFormgroup: FormGroup;
  timelineTypes: string[] = [];

  constructor(private fb: FormBuilder , private timelineService: TimelineService , private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.timelineFormgroup = this.fb.group({
      'timelineName' : ['',notEmpty()] ,
      'startingDate' : ['' , notEmpty()] ,
      'selectTimelineType' : ['',Validators.required]
    });
  }

  onSubmit(){

   let timelineName = this.timelineFormgroup.get('timelineName').value;
   let timelineType = this.timelineFormgroup.get('selectTimelineType').value;
   let startingDate = +this.timelineFormgroup.get('startingDate').value; // + convert string into number

   const addTimelineFormModel: AddTimelineFormModel = { timelineName ,  timelineType , startingDate };

   this.timelineService.addTimeline(addTimelineFormModel).subscribe((res) => {

    if (res.successStatus){
      this.matSnackBar.open(res.notificationMsg , "Success");
    }

    else if (res.errorStatus) {
      this.matSnackBar.open(res.notificationMsg , "Error");
    }

   });
  }

}
