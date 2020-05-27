import { DateService } from './../service/date.service';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ImpDateDisplayComponent } from './imp-date-display.component';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as moment from 'moment';

describe('ImpDateDisplayComponent', () => {
  let component: ImpDateDisplayComponent;
  let fixture: ComponentFixture<ImpDateDisplayComponent>;

  let dateServiceMock: jasmine.SpyObj<DateService> ;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    dateServiceMock = jasmine.createSpyObj<DateService> ('DateService',['getImporantDate']);
    TestBed.configureTestingModule({
      declarations: [ ImpDateDisplayComponent ],
      providers:[
        {provide: DateService , useValue: dateServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpDateDisplayComponent);
    component = fixture.componentInstance;
    htmlElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the important date list ' , () => {

      // mock the DateService to get the array of important dates
      let getImporantDateSpy = dateServiceMock.getImporantDate.and.returnValue(of([
         {date: moment.now() , title : 'start'},
         {date: moment.now() , title : 'start'}
      ]));

      // call the ngOnInit so it get the value of the important dates
      component.ngOnInit();

      // Call the Detect Change method to check the new value
      fixture.detectChanges();

      // get the html element containing the date
      let dateDomElement = htmlElement.querySelectorAll('[data-test="date"]');

      // expect the no of total dates to be same as the spy passed
      expect(dateDomElement.length).toBe(2);

   }
  );

});
