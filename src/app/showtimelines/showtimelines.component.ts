import { TimelineService } from './../service/timeline.service';
import { Component, OnInit } from '@angular/core';
import {Timeline} from '../models/timeline';
import { Page } from '../models/page';


@Component({
  selector: 'app-showtimelines',
  templateUrl: './showtimelines.component.html',
  styleUrls: ['./showtimelines.component.css']
})
export class ShowtimelinesComponent implements OnInit {


  timelineList: Timeline[] ;
  pageNo: number = 0;
  pageSize: number = 10;
  noOfElements: number;
  pageSizeOptions: number[] = [10, 20,50,100];

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.initData();
    }

  initData(){
    this.timelineService.getTimelineList(this.pageNo , this.pageSize).subscribe((page) => {
      this.timelineList = page.getContent();
      this.pageNo = page.pageNo;
      this.pageSize = page.pageSize;
      this.noOfElements = page.noOfElements;
    });
  }


  deleteTimeline(timelineId: string){


  }

}
