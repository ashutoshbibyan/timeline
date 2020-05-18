import { Notification } from './../models/notification';
import { TestBed, getTestBed } from '@angular/core/testing';

import { DateService } from './date.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Importantdate } from '../models/importantdate';

describe('DateService', () => {
  let service: DateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DateService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test The getImporantDate for api calls at /api/pvt/impdates ' , () => {

    let testUrl = "/api/pvt/impdates";

    it('should make the reqest to the api' , () => {

      service.getImporantDate().subscribe();

      let req = httpTestingController.expectOne(testUrl);

      expect(req).toBeTruthy();

    });


    it('should make the reqest to the api with get method ' , () => {

      service.getImporantDate().subscribe();

      let req = httpTestingController.expectOne(testUrl);

      expect(req.request.method).toEqual("GET");

    });

    it('should send the mockresponse back ' , () => {
      let mockres: Importantdate [] = [{date: new Date() , title: "First"} , {date: new Date() , title: "second"}];
      service.getImporantDate().subscribe((res) =>{
        expect(res).toEqual(mockres);
      });

      let req = httpTestingController.expectOne(testUrl);

      req.flush(mockres);

    });

  });



  describe('Test The addImpoortantDate for api calls at /api/pvt/impdate ' , () => {

    let testUrl = "/api/pvt/impdate";
    let testParam: Importantdate = {date: new Date() , title: "test"};

    it('should make the reqest to the api' , () => {

      service.addImpDate(testParam).subscribe();

      let req = httpTestingController.expectOne(testUrl);

      expect(req).toBeTruthy();

    });


    it('should make the reqest to the api with get method ' , () => {

      service.addImpDate(testParam).subscribe();

      let req = httpTestingController.expectOne(testUrl);

      expect(req.request.method).toEqual("POST");

    });

    it('should make the reqest to the api with Test Param  ' , () => {

      service.addImpDate(testParam).subscribe();

      let req = httpTestingController.expectOne(testUrl);

      expect(req.request.body).toEqual(testParam);

    });

    it('should send the mockresponse back ' , () => {
      let mockres: Notification = {successStatus: true , errorStatus: false , notificationMsg :"Date is added "} ;
      service.addImpDate(testParam).subscribe((res) =>{
        expect(res).toEqual(mockres);
      });

      let req = httpTestingController.expectOne(testUrl);

      req.flush(mockres);

    });

  });

});
