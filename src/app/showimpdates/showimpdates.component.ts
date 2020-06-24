import { DateService } from './../service/date.service';
import { Observable } from 'rxjs';
import { Importantdate } from './../models/importantdate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showimpdates',
  templateUrl: './showimpdates.component.html',
  styleUrls: ['./showimpdates.component.css']
})
export class ShowimpdatesComponent implements OnInit {

  impDates: Observable <Importantdate[]>;

  constructor(private dateService: DateService) { }

  ngOnInit(): void {

    this.impDates = this.dateService.getImportantDates();
  }

  delete(impdateId: string){

  }

  edit(impdateId: string){

  }

}
