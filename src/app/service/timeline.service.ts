import { Page } from './../models/page';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { AddTimelineFormModel } from './../form-data-models/add-timeline-form-model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';
import { Timeline } from '../models/timeline';


@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  appJsonHeader: HttpHeaders = new HttpHeaders( { 'Content-Type': 'application/json' } );


  constructor(private httpClient: HttpClient) { }

  addTimeline(data: AddTimelineFormModel): Observable<Notification>{

    let url = "/api/timeline/add";

    return this.httpClient.post<Notification>(url , data);
  }

  getTimelineList(pageNo: number , pageSize: number ): Observable<Page>{

    let params: HttpParams = new HttpParams().set( 'pageNo', pageNo.toString()).set('pageSize', pageSize.toString());

    return this.httpClient.get<Page>("/api/timeline/list" , {headers: this.appJsonHeader , params});
  }

  saveTimeline(timeline: Timeline): Observable<Notification>{
    return null;
  }

  getTimeline(id: string): Observable<Timeline>{
    return null;
  }

  deleteTimeline(id: string): Observable<Notification>{
    return null;
  }




}
