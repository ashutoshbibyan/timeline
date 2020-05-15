import { Notification } from './../models/notification';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { LogInService } from './../service/log-in.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { Router} from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let htmlElement: HTMLElement ;
  const logInMockService: jasmine.SpyObj<LogInService> = jasmine.createSpyObj<LogInService>('LogInService' , ['authenticate']) ;
  const mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers:[
        {provide: FormBuilder },
        {provide: LogInService , useValue: logInMockService },
        {provide: Router , useValue : mockRouter}
      ]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    htmlElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });


  describe('Component Intialized' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it( 'should show the login form' , () => {

      expect(htmlElement.querySelector('[data-test="input-userName"]')).toBeTruthy();
      expect(htmlElement.querySelector('[data-test="input-password"]')).toBeTruthy();
      expect(htmlElement.querySelector('[data-test="btn-submit"]')).toBeTruthy();

    });

  });





  it('should authenticate the user and navigate to /user/home if authenticated ' , () => {

    let response: Notification = {successStatus:true , errorStatus: false , notificationMsg:"authenticatd"};

    let authentication = logInMockService.authenticate.and.returnValue(of(response));

    htmlElement.querySelector('[data-test="form-login"]').dispatchEvent(new Event('ngSubmit'));
    fixture.detectChanges();
    expect(authentication).toHaveBeenCalledTimes(1);

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/home');

  });



  describe('LogIn Form Validation', () => {


    it('Should emit the username on input event ' , () => {

      const userName: HTMLInputElement = htmlElement.querySelector('[data-test="input-userName"]');

      userName.value = 'ashutosh' ;

      // the new Event maynot work in old browser but we are using chrome so its okay here
      userName.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.formLogin.controls['userName'].value).toBe('ashutosh');

    });

    it('Should emit the password on input event' , () => {

      const password: HTMLInputElement = htmlElement.querySelector('[data-test="input-password"]');

      // the new Event maynot work in old browser but we are using chrome so its okay here
      const event = new Event('input');

      password.value = '123456' ;

      password.dispatchEvent(event);

      fixture.detectChanges();

      expect(component.formLogin.controls["password"].value).toBe('123456');

    });

    it('Validation should be false when userName is not Entered ' , () => {

      // get the userName Element
      let userName: HTMLInputElement = htmlElement.querySelector('[data-test="input-userName"]');

      userName.value = "";
      userName.dispatchEvent(new Event("input"));
      fixture.detectChanges();

     // check if the Validation is correct

      expect(component.formLogin.controls['userName'].valid).toEqual(false);


    });

    it('Validation Should Be false When Password is not Entered  ' , () => {

      // get the password Element
      let password: HTMLInputElement = htmlElement.querySelector('[data-test="input-password"]');

      password.value = "";

      password.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      // check if the Validation is correct

      expect(component.formLogin.controls['password'].valid).toEqual(false);


    });

    it('Validation Should Be False When UserName is Just Empty Spaces' , () => {

      // get the userName Element
      let userName: HTMLInputElement = htmlElement.querySelector('[data-test="input-userName"]');

      userName.value = "     ";

      userName.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      // check if the Validation is correct

      expect(component.formLogin.controls['userName'].valid).toEqual(false);


    });


    it('Validation Should Be False When Password is Just Empty Space' , () => {

      // get the password Element
      let password: HTMLInputElement = htmlElement.querySelector('[data-test="input-password"]');

      password.value = "     ";

      password.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      // check if the Validation is correct

      expect(component.formLogin.controls['password'].valid).toEqual(false);


    });

    it('Should show VALID Validation When UserName and Password with Right Value ' , () => {

      // get the password Element
      let password: HTMLInputElement = htmlElement.querySelector('[data-test="input-password"]');

      let userName: HTMLInputElement = htmlElement.querySelector('[data-test="input-userName"]');

      userName.value = "ashutosh";

      userName.dispatchEvent(new Event("input"));

      password.value = "123456";

      password.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      // check if the Validation is correct

      expect(component.formLogin.status).toEqual("VALID");


    });

    it('Submit button Should Be Disabled When There Are Validation Error  ' , () => {
      let btnSubmit: HTMLButtonElement = htmlElement.querySelector('[data-test="btn-submit"]');

       // get the password Element
      let password: HTMLInputElement = htmlElement.querySelector('[data-test="input-password"]');

      let userName: HTMLInputElement = htmlElement.querySelector('[data-test="input-userName"]');

      userName.value = "  ";

      userName.dispatchEvent(new Event("input"));

      password.value = "   ";

      password.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      expect(btnSubmit.disabled).toEqual(true);

    });

    it('Submit button Should be Active When No Validation Error Occur  ' , () => {
      let btnSubmit: HTMLButtonElement = htmlElement.querySelector('[data-test="btn-submit"]');

       // get the password Element
      let password: HTMLInputElement = htmlElement.querySelector('[data-test="input-password"]');

      let userName: HTMLInputElement = htmlElement.querySelector('[data-test="input-userName"]');

      userName.value = "ashutosh";

      userName.dispatchEvent(new Event("input"));

      password.value = "123456";

      password.dispatchEvent(new Event("input"));

      fixture.detectChanges();

      expect(btnSubmit.disabled).toEqual(false);

    });

  });

});
