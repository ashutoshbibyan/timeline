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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'should show the login form' , () => {

      expect(htmlElement.querySelector('[data-test="input-userName"]')).toBeTruthy();
      expect(htmlElement.querySelector('[data-test="input-password"]')).toBeTruthy();
      expect(htmlElement.querySelector('[data-test="btn-submit"]')).toBeTruthy();

  });

  it('should emit the username on input event ' , () => {

    const userName: HTMLInputElement = htmlElement.querySelector('[data-test="input-userName"]');

    userName.value = 'ashutosh' ;

    // the new Event maynot work in old browser but we are using chrome so its okay here
    userName.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.formLogin.controls['userName'].value).toBe('ashutosh');

  });

  it('should emit the password on input event' , () => {

    const password: HTMLInputElement = htmlElement.querySelector('[data-test="input-password"]');

    // the new Event maynot work in old browser but we are using chrome so its okay here
    const event = new Event('input');

    password.value = '123456' ;

    password.dispatchEvent(event);

    fixture.detectChanges();

    expect(component.formLogin.controls["password"].value).toBe('123456');

  });


  it('should authenticate the user and navigate to /user/home if authenticated else to /error' , () => {

    let authentication = logInMockService.authenticate.and.returnValue(true);

    htmlElement.querySelector('[data-test="form-login"]').dispatchEvent(new Event('ngSubmit'));
    fixture.detectChanges();
    expect(authentication).toHaveBeenCalledTimes(1);

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/home');

  });


});
