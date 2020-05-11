import { Notification } from './../models/notification';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {UserSignUpModel} from "../form-data-models/user-signup-form-model";

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let httpTestController: HttpTestingController ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);

  });

  afterEach(() => {
    // check no http req left
    httpTestController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Signup Api Calls test ' , () =>{

    let testUrl = "/api/user/signup";

    // it is the parameter for the  signup method
    let user: UserSignUpModel = {userName:"ashutosh" , password:"123456"};

    // response test data
    let testData: Notification = {successStatus: true , errorStatus: false , notificationMsg:"Sign Up Successfull"};


    it('should call the api at correct url' , () => {

      service.signUp(user).subscribe();

      let req = httpTestController.expectOne(testUrl);

      expect(req).toBeTruthy();

    });

    it('should signup an new user using the rest api using post method ' , () => {

      service.signUp(user).subscribe();

      let req = httpTestController.expectOne(testUrl);

      expect(req.request.method).toEqual("POST");

    });

    it('should send the user data in body of rest api' , () => {

      service.signUp(user).subscribe();

      let req = httpTestController.expectOne(testUrl);

      expect(req.request.body).toEqual(user);

    });

    it('should give the same test data as a response when user call the rest api ' , () => {

      service.signUp(user).subscribe((data) => {
       expect(data).toEqual(testData);
     });

      let req = httpTestController.expectOne(testUrl);

      req.flush(testData);

    });






  });





});
