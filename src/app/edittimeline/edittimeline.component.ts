import { Timeline } from './../models/timeline';
import { ActivatedRoute } from '@angular/router';
import { TimelineService } from './../service/timeline.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private fb: FormBuilder , private timelineService: TimelineService , private acroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.acroute.paramMap.subscribe((param) => {
      this.timelineId = param.get("id");
    });

    this.timelineService.getTimeline(this.timelineId).subscribe((timeline) => {
      this.timeline = timeline;
    });

    this.timelineFormgroup = this.fb.group({
      timelineName: [this.timeline.timelineName],
      startingDate: [this.timeline.startingDate.toISOString().slice(0, 10)], // slice the date into yyyy-mm-dd format for input field
      selectTimelineType: [this.timeline.timelineType]
    });
  }

  onSubmit(){
    this.timeline.timelineName = this.timelineFormgroup.controls['timelineName'].value;
    this.timeline.startingDate = new Date(this.timelineFormgroup.controls['startingDate'].value);
    this.timeline.timelineType = this.timelineFormgroup.controls['selectTimelineType'].value;

    this.timelineService.saveTimeline(this.timeline);
  }

}
