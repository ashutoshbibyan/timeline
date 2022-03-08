import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Importantdate } from '../models/importantdate';
import {Observable ,of} from "rxjs";
import { TimelineService } from '../service/timeline.service';
import * as moment from "moment";

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {
  

  timeLineId:string;

  impDates:Observable<Importantdate[]> = of([{date:moment.now() , title:"first date " , impdateId:"3" , timelineId:"35" },
                                             {date:moment.now() , title:"first date " , impdateId:"3" , timelineId:"35" },
                                             {date:moment.now() , title:"first date " , impdateId:"3" , timelineId:"35" }]
                                             );

  constructor(private acRoute:ActivatedRoute , private timeLineService:TimelineService) { }

  ngOnInit(): void {

    /**
    this.acRoute.paramMap.subscribe((value)=>{
      this.timeLineId = value.get('id');

    });

    this.impDates = this.timeLineService.getImpDatesList(this.timeLineId);
*/
  }

}
