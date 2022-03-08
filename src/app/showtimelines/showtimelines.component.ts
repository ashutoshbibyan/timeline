import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimelineService } from './../service/timeline.service';
import { Component, OnInit } from '@angular/core';
import {Timeline} from '../models/timeline';
import { Page } from '../models/page';
import * as moment from "moment";

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

  constructor(private timelineService: TimelineService , private matSnackBar: MatSnackBar , private router: Router) { }

  ngOnInit(): void {
    this.initData();
    }

  initData(){
 //   this.timelineService.getTimelineList(this.pageNo , this.pageSize).subscribe((page) => {
      //this.timelineList = page.getContent();
      
      //this.pageNo = page.pageNo;
      //this.pageSize = page.pageSize;
      //this.noOfElements = page.noOfElements;
 //   });

    this.timelineList =[
      {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()}
    ];
  }


  deleteTimeline(timelineId: string){

    this.timelineService.deleteTimeline(timelineId).subscribe((res) => {
      if(res.successStatus){
        this.matSnackBar.open(res.notificationMsg , "Success");
      }
      else if (res.errorStatus){
        this.matSnackBar.open(res.notificationMsg , "Error");
      }
    });

  }

  editTimeline(timelineId: string){

    let url = `/timeline/edit/${timelineId}`;
    this.router.navigateByUrl(url);
  }

}
