import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateService } from './../service/date.service';
import { Observable } from 'rxjs';
import { Importantdate } from './../models/importantdate';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { of } from 'rxjs';


@Component({
  selector: 'app-showimpdates',
  templateUrl: './showimpdates.component.html',
  styleUrls: ['./showimpdates.component.css']
})
export class ShowimpdatesComponent implements OnInit {

  impDates: Observable <Importantdate[]>;

  constructor(private dateService: DateService , private matSnackBar: MatSnackBar ,
    private router: Router) { }

  ngOnInit(): void {

   // this.impDates = this.dateService.getImportantDates();

   this.impDates =  of(
    [{impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"}
    ,{impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"} ,
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"},
    {impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"}]
  );
  }

  delete(impdateId: string){

    this.dateService.deleteImpDate(impdateId).subscribe((res) => {
      if (res.successStatus){
        this.matSnackBar.open(res.notificationMsg , 'Success');
      }
      else if(res.errorStatus){
        this.matSnackBar.open(res.notificationMsg , 'Error');
      }
    });

  }

  edit(impdateId: string){
    let url = `/impdate/edit/${impdateId}`;
    this.router.navigateByUrl(url);
  }

}
