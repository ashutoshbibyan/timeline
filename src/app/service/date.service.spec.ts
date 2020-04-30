import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Notification } from '../models/notification';
import { Importantdate } from '../models/importantdate';

describe('DateService', () => {
  let service: DateService;
  let httpClientMock: jasmine.SpyObj<HttpClient> =

  jasmine.createSpyObj<HttpClient>('HttpClient' , ['get' , 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide: HttpClient , useValue: httpClientMock}
      ]
    });
    service = TestBed.inject(DateService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of impdate from rest api at url = /api/pvt/impdates  with the get request' , () => {

    // Mock the httpClient behaviour
    let clientSpy: jasmine.Spy = httpClientMock.get.and.returnValue(of([
      { date: new Date() , title : 'last'}
    ]));

    // call the getImportantDated method
    service.getImporantDate();

    // check if it call the correct url for the data
    expect(clientSpy).toHaveBeenCalledWith('/api/pvt/impdates');

  });

  it('should add the imp date by calling rest api at url = /api/pvt/impdate  with the post request' , () => {

    const notification: Notification = new Notification();
    notification.successStatus = true ;
    notification.notificationMsg = "Date is added ";
    notification.errorStatus = false ;

    // Mock the httpClient behaviour and return the notification object 
    let clientSpy: jasmine.Spy = httpClientMock.post.and.returnValue(of(notification));



    // call the getImportantDated method
    let impDate: Importantdate = {date: new Date("01/01/2020") , title: "Test Date"};
    service.addImpDate(impDate);



    // check if it call the correct url for the data
    expect(clientSpy).toHaveBeenCalledWith('/api/pvt/impdate' , impDate);

   
  });


});
