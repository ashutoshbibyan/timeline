import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpDateComponent } from './add-imp-date.component';

import {FormBuilder} from "@angular/forms";

import {} from "@angular/forms";
import { DateService } from '../service/date.service';
import { Notification } from '../models/notification';
import { of } from 'rxjs';

describe('AddImpDateComponent', () => {
  let component: AddImpDateComponent;
  let fixture: ComponentFixture<AddImpDateComponent>;
  let nativeElement: any ;
  let dateServiceMock: jasmine.SpyObj<DateService> = jasmine.createSpyObj<DateService>("DateService" , ['addImpDate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImpDateComponent ],
      providers:[
        {provide: FormBuilder },
        {provide: DateService , useValue: dateServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImpDateComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the imp date form ' , () => {

    const inputImpDate : HTMLInputElement = nativeElement.querySelector('[data-test="input-impdate"]');
    const inputImpTitle : HTMLInputElement = nativeElement.querySelector('[data-test="input-imptitle"]');
    const btnSubmit : HTMLInputElement = nativeElement.querySelector('[data-test="btn-submit"]');


    expect(inputImpDate).toBeTruthy();
    expect(inputImpDate.type).toBe("date");

    expect(inputImpTitle).toBeTruthy();
    expect(inputImpTitle.type).toBe("text");

    expect(btnSubmit).toBeTruthy();
    expect(btnSubmit.type).toBe("submit");

    
  } );

  it('should have call the onSubmit Method when form is submited ' , () => {



    let onSubmitSpy  = spyOn(component ,"onSubmit");

    const formAddImpDate : HTMLFormElement = nativeElement.querySelector('[data-test="form-addimpdate"]');

    formAddImpDate.dispatchEvent(new Event("ngSubmit"));
    
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    
  } );

  it('should have value of the input field in the formgroup ' , () => {

    // first put the value in the input field 
    const inputImpDate : HTMLInputElement = nativeElement.querySelector('[data-test="input-impdate"]');
    const inputImpTitle : HTMLInputElement = nativeElement.querySelector('[data-test="input-imptitle"]');

    inputImpDate.value = "" ;
    inputImpTitle.value = "" ;

    // then fire the submit event using the form element 

    const formAddImpDate : HTMLFormElement = nativeElement.querySelector('[data-test="form-addimpdate"]');

    formAddImpDate.dispatchEvent(new Event("submit"));

    // check if the component form group have the same fields 

    expect(component.formGroupAddImpDate.controls['impdate'].value).toEqual("");
    expect(component.formGroupAddImpDate.controls['imptitle'].value).toEqual("");

  } );

  it('should call the dateservice to add the imp date into database When OnSubmit Method Execute ' , () => {

    // create stub value of notification object 
    const notification: Notification = new Notification();
    notification.successStatus = true ;
    notification.notificationMsg = "Date is added ";
    notification.errorStatus = false ;

    // mock the date service to call the method to add imp date 
    dateServiceMock.addImpDate.and.returnValue(of(notification));


    // call the on Submit method 
    component.onSubmit();

    // call the onSubmit method and expect the result to be the mocked value
    expect(component.notification).toEqual(notification);

  });

  
});
