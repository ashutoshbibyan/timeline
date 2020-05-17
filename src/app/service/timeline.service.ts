import { HttpClient } from '@angular/common/http';
import { AddTimelineFormModel } from './../form-data-models/add-timeline-form-model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private httpClient: HttpClient) { }

  addTimeline(data: AddTimelineFormModel): Observable<Notification>{

    let url = "/api/timeline/add";

    return this.httpClient.post<Notification>(url , data);
  }
}
