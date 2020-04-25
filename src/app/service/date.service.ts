import { HttpClient } from '@angular/common/http';
import { Importantdate } from './../models/importantdate';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private httpClient: HttpClient) { }

  getImporantDate(): Observable<Importantdate[]>{

    return this.httpClient.get<Importantdate[]>('/api/pvt/impdates');
  }

}
