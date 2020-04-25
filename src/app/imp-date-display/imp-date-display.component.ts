import { DateService } from './../service/date.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Importantdate } from '../models/importantdate';

@Component({
  selector: 'app-imp-date-display',
  templateUrl: './imp-date-display.component.html',
  styleUrls: ['./imp-date-display.component.css']
})
export class ImpDateDisplayComponent implements OnInit {

  impDates: Observable<Importantdate[]> ;

  constructor(private dateService: DateService) { }

  ngOnInit(): void {

    this.impDates = this.getImporantDate();


  }

  getImporantDate(): Observable<Importantdate[]>{
    return this.dateService.getImporantDate();
  }

}
