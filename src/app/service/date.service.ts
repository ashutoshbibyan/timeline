import { HttpClient } from '@angular/common/http';
import { Importantdate } from './../models/importantdate';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private httpClient: HttpClient) { }

  getImportantDate(impDateId: string): Observable<Importantdate>{
    return null ;
  }

  getImportantDates(): Observable<Importantdate[]>{

    return this.httpClient.get<Importantdate[]>('/api/pvt/impdates');
  }


  addImpDate(impDate: Importantdate): Observable<Notification>{

    return this.httpClient.post<Notification>('/api/pvt/impdate' , impDate);


  }

  updateImpDate(impDate: Importantdate) : Observable<Notification>{

    return null;
  }

  deleteImpDate(impDateId: string): Observable<Notification>{

    return null ;

  }

}
