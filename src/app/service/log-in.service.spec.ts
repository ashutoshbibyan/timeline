import { Notification } from './../models/notification';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LogInService } from './log-in.service';
import { HttpClient } from '@angular/common/http';



describe('LogInService', () => {
  let service: LogInService;
  let httpTestingController: HttpTestingController;
  let testUrl: string = "/api/login" ;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports:[HttpClientTestingModule]

    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LogInService);


  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make request to the rest api at test url ' , () => {

    service.authenticate( "ashutosh" , "123456" ).subscribe();

    let req = httpTestingController.expectOne(testUrl);

    expect(req).toBeTruthy();

  });

  it('should make a POST request to the rest api at test url ' , () => {

    service.authenticate( "ashutosh" , "123456" ).subscribe();

    let req = httpTestingController.expectOne(testUrl);

    expect(req.request.method).toEqual("POST");
  });

  it('should have same test data in the body of request ' , () => {

    // test data
    let body = { userName: "ashutosh" , password: "123456"};

    service.authenticate( "ashutosh" , "123456" ).subscribe();

    let req = httpTestingController.expectOne(testUrl);

    expect(req.request.body).toEqual(body);
  });


  it('should return the same test response when user is authenticated  ' , () => {

    // test response
    let response: Notification = {successStatus: true , errorStatus: false , notificationMsg:"authenticated"};

    service.authenticate( "ashutosh" , "123456" ).subscribe(
      (data) => {
        expect(data).toEqual(response);
      }
    );

    let req = httpTestingController.expectOne(testUrl);

    req.flush(response);

  });


});
