import { MatSnackBar } from '@angular/material/snack-bar';
import { Timeline } from './../models/timeline';
import { ActivatedRoute } from '@angular/router';
import { TimelineService } from './../service/timeline.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { notEmpty } from '../custom_validators/not-empty-validator';

@Component({
  selector: 'app-edittimeline',
  templateUrl: './edittimeline.component.html',
  styleUrls: ['./edittimeline.component.css']
})
export class EdittimelineComponent implements OnInit {
  timeline: Timeline ;
  timelineId: string ;
  timelineTypes: string[] = [];
  timelineFormgroup: FormGroup;

  constructor(private fb: FormBuilder , private timelineService: TimelineService , private acroute: ActivatedRoute
    , private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.acroute.paramMap.subscribe((param) => {
      this.timelineId = param.get("id");
    });

    this.timelineService.getTimeline(this.timelineId).subscribe((timeline) => {
      this.timeline = timeline;
    });

    this.timelineFormgroup = this.fb.group({
      timelineName: [this.timeline.timelineName , [notEmpty()]],
       // slice the date into yyyy-mm-dd format for input field
      startingDate: [moment(this.timeline.startingDate).format("YYYY-MM-DD") , [notEmpty()]],
      selectTimelineType: [this.timeline.timelineType , [Validators.required]]
    });
  }

  onSubmit(){
    this.timeline.timelineName = this.timelineFormgroup.controls['timelineName'].value;
    this.timeline.startingDate = moment(this.timelineFormgroup.controls['startingDate'].value).valueOf();
    this.timeline.timelineType = this.timelineFormgroup.controls['selectTimelineType'].value;

    this.timelineService.saveTimeline(this.timeline).subscribe((res) =>{

      if(res.successStatus){
        this.matSnackBar.open(res.notificationMsg , "Updated");
      }
      else if(res.errorStatus){
        this.matSnackBar.open(res.notificationMsg , "Error");
      }

    });
  }

}
