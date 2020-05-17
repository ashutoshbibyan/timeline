import { UserSignUpModel } from './../form-data-models/user-signup-form-model';
import { of } from 'rxjs';
import { Notification } from './../models/notification';
import { UserService } from './../service/user.service';
import { FormBuilder , ReactiveFormsModule} from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UsersignupComponent } from './usersignup.component';

describe('UsersignupComponent', () => {
  let component: UsersignupComponent;
  let fixture: ComponentFixture<UsersignupComponent>;
  let userServiceMock: jasmine.SpyObj<UserService> ;

  beforeEach(async(() => {
    userServiceMock =  jasmine.createSpyObj("UserService" , ["signUp"]);
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ UsersignupComponent ],
      providers: [
        {provide: FormBuilder},
        {provide: UserService , useValue: userServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(element: string): any{
      return  fixture.debugElement.nativeElement.querySelector(element);
  }


  describe('Component Intitalized' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have the user signup form ' , () => {
      let inputUserName: HTMLInputElement = el('[data-test="input-username"]');
      let inputPassword: HTMLInputElement = el('[data-test="input-password"]');
      let btnSubmit: HTMLButtonElement = el ('[data-test="btn-submit"]');


      expect(inputUserName).toBeTruthy();
      expect (inputPassword).toBeTruthy();
      expect (btnSubmit).toBeTruthy();

      expect(inputUserName.type).toEqual("text");
      expect(inputPassword.type).toEqual("password");
      expect(btnSubmit.type).toEqual("submit");

    });

  });

  describe('Component Functionality' , () => {

    it('FormGroup Should Have The input value of username' , () =>{

      const testValue = "ashutosh";

      let inputUserName: HTMLInputElement = el('[data-test="input-username"]');

      inputUserName.value = testValue;

      inputUserName.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['userName'].value).toEqual(testValue);


    });


    it('FormGroup Should Have The input value of password' , () =>{

      const testValue = "123456";

      let inputPassword: HTMLInputElement = el('[data-test="input-password"]');

      inputPassword.value = testValue;

      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['password'].value).toEqual(testValue);


    });

    it('OnSubmit Method Should be called when click on the submit button' , () => {

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      let onSubmitSpy = spyOn(component , 'onSubmit');

      // remove the button disabled cuz we are not testing the validation here
      btnSubmit.disabled = false ;
      btnSubmit.click();

      expect(onSubmitSpy).toHaveBeenCalledTimes(1);

    });



    it("UserService Signup Method should be called when OnSubmit Method is Executed " , () => {

      let notification: Notification = {successStatus : false , errorStatus : true ,notificationMsg:"Error While Signup"};

      let signUpMock = userServiceMock.signUp.and.returnValue(of(notification));

      component.onSubmit();


      expect(signUpMock).toHaveBeenCalledTimes(1);

  });

    it("UserService Signup Method should be called with the data entered by user " , () => {


      let notification: Notification = {successStatus : false , errorStatus : true ,notificationMsg:"Error While Signup"};

      let signUpMock = userServiceMock.signUp.and.returnValue(of(notification));

      // set the value in the form group
      component.userSignupForm.get('userName').setValue("ashutosh");
      component.userSignupForm.get('password').setValue('123456');

      fixture.detectChanges();

      // user object is created with the value of the controls
      let user: UserSignUpModel = {userName:component.userSignupForm.controls['userName'].value ,
                    password: component.userSignupForm.controls['password'].value};


      component.onSubmit();


      expect(signUpMock).toHaveBeenCalledWith(user);

  });

  });

  describe('UserSignUp Form Validation ' , () => {

    it('Validation Should be true When username is entered correctly ' , () => {
      let inputUserName: HTMLInputElement = el('[data-test="input-username"]');

      inputUserName.value = "ashutosh" ;
      inputUserName.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['userName'].valid).toEqual(true);

    });


    it('Validation Should be false When username is not entered  ' , () => {
      let inputUserName: HTMLInputElement = el('[data-test="input-username"]');

      inputUserName.value = "" ;
      inputUserName.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['userName'].valid).toEqual(false);

    });


    it('Validation Should be false When username is just empty spaces  ' , () => {
      let inputUserName: HTMLInputElement = el('[data-test="input-username"]');

      inputUserName.value = "      " ;
      inputUserName.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['userName'].valid).toEqual(false);

    });


    it('Validation Should be true When password is entered correctly ' , () => {
      let inputPassword: HTMLInputElement = el('[data-test="input-password"]');

      inputPassword.value = "123456" ;
      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['password'].valid).toEqual(true);

    });

    it('Validation Should be false When password is not entered ' , () => {
      let inputPassword: HTMLInputElement = el('[data-test="input-password"]');

      inputPassword.value = "" ;
      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['password'].valid).toEqual(false);

    });


    it('Validation Should be false When password is just empty space ' , () => {
      let inputPassword: HTMLInputElement = el('[data-test="input-password"]');

      inputPassword.value = "     " ;
      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.userSignupForm.controls['password'].valid).toEqual(false);

    });


    it('Submit Button should be Enabled when there are No Validation Errors ' , () => {

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');
      let inputPassword: HTMLInputElement = el('[data-test="input-password"]');
      let inputUserName: HTMLInputElement = el('[data-test="input-username"]');


      inputUserName.value = "ashutosh";
      inputPassword.value = "123456";

      inputUserName.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();


      expect(btnSubmit.disabled).toEqual(false);

    });


    it('Submit Button should be disabled when there are Validation Errors ' , () => {

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');
      let inputPassword: HTMLInputElement = el('[data-test="input-password"]');
      let inputUserName: HTMLInputElement = el('[data-test="input-username"]');


      inputUserName.value = "";
      inputPassword.value = "";

      inputUserName.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();


      expect(btnSubmit.disabled).toEqual(true);

    });





  });


});
