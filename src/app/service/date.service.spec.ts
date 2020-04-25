import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DateService', () => {
  let service: DateService;
  let httpClientMock: jasmine.SpyObj<HttpClient> =

  jasmine.createSpyObj<HttpClient>('HttpClient' , ['get']);

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

  it('should get the list of impdate from rest api at url = /api/pvt/impdates ' , () => {

    // Mock the httpClient behaviour
    let clientSpy: jasmine.Spy = httpClientMock.get.and.returnValue(of([
      { date: new Date() , title : 'last'}
    ]));

    // call the getImportantDated method
    service.getImporantDate();

    // check if it call the correct url for the data
    expect(clientSpy).toHaveBeenCalledWith('/api/pvt/impdates');

  });

});
