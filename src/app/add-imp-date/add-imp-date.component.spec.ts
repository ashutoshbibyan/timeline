import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpDateComponent } from './add-imp-date.component';

import {FormBuilder,ReactiveFormsModule} from "@angular/forms";

import {} from "@angular/forms";
import { DateService } from '../service/date.service';
import { Notification } from '../models/notification';
import { of } from 'rxjs';

describe('AddImpDateComponent', () => {
  let component: AddImpDateComponent;
  let fixture: ComponentFixture<AddImpDateComponent>;
  let nativeElement: any ;
  let dateServiceMock: jasmine.SpyObj<DateService> ;

  beforeEach(async(() => {
    dateServiceMock = jasmine.createSpyObj<DateService>("DateService" , ['addImpDate']);
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
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


  describe('Component Intitalized', () => {

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

  } );


  describe('Component Functionality ' , () => {

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

      inputImpDate.value = "2020-02-20" ;
      inputImpTitle.value = "test title" ;

      // dispatch the input event so value is added in the component
      // the new Event maynot work in old browser but we are using chrome so its okay here
      inputImpDate.dispatchEvent(new Event ("input"));
      inputImpTitle.dispatchEvent(new Event ("input"));

      fixture.detectChanges();

      // check if the component form group have the same fields

      expect(component.formGroupAddImpDate.controls['impdate'].value).toEqual("2020-02-20");
      expect(component.formGroupAddImpDate.controls['imptitle'].value).toEqual("test title");

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

  }) ;

  describe('Form Validation' , () => {

    it('Validation Should be true when date is not empty' , () => {

      let inputDate: HTMLInputElement = nativeElement.querySelector('[data-test="input-impdate"]');

      inputDate.value = '2020-03-21';

      inputDate.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.formGroupAddImpDate.controls['impdate'].valid).toEqual(true);

    });

    it('Validation Should be false when date is empty' , () => {

      let inputDate: HTMLInputElement = nativeElement.querySelector('[data-test="input-impdate"]');

      inputDate.value = '';

      inputDate.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.formGroupAddImpDate.controls['impdate'].valid).toEqual(false);

    });

    it('Validation Should be false when date is in Wrong Format' , () => {

      let inputDate: HTMLInputElement = nativeElement.querySelector('[data-test="input-impdate"]');

      inputDate.value = '    ';

      inputDate.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.formGroupAddImpDate.controls['impdate'].valid).toEqual(false);

    });

    it('Validation Should Be true When Title is Not Empty' , () => {

      let inputTitle: HTMLInputElement = nativeElement.querySelector('[data-test="input-imptitle"]');

      inputTitle.value = "test Title" ;

      inputTitle.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.formGroupAddImpDate.controls['imptitle'].valid).toEqual(true);

    });

    it('Validation Should Be false When Title is Empty' , () => {

      let inputTitle: HTMLInputElement = nativeElement.querySelector('[data-test="input-imptitle"]');

      inputTitle.value = "" ;

      inputTitle.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.formGroupAddImpDate.controls['imptitle'].valid).toEqual(false);

    });

    it('Validation Should Be false When Title is just empty space' , () => {

      let inputTitle: HTMLInputElement = nativeElement.querySelector('[data-test="input-imptitle"]');

      inputTitle.value = "        " ;

      inputTitle.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.formGroupAddImpDate.controls['imptitle'].valid).toEqual(false);

    });

    it('Submit Button should Be Disabled When There Are Validation Errors ' , () => {

      let btnSubmit: HTMLButtonElement = nativeElement.querySelector('[data-test="btn-submit"]');
      let inputTitle: HTMLInputElement = nativeElement.querySelector('[data-test="input-imptitle"]');
      let inputDate: HTMLInputElement = nativeElement.querySelector('[data-test="input-impdate"]');

      inputTitle.value = "" ;
      inputDate.value = "" ;

      inputTitle.dispatchEvent(new Event('input'));
      inputDate.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(btnSubmit.disabled).toEqual(true);

    });

    it('Submit Button should Be Active When There Are No Validation Errors ' , () => {

      let btnSubmit: HTMLButtonElement = nativeElement.querySelector('[data-test="btn-submit"]');
      let inputTitle: HTMLInputElement = nativeElement.querySelector('[data-test="input-imptitle"]');
      let inputDate: HTMLInputElement = nativeElement.querySelector('[data-test="input-impdate"]');

      inputTitle.value = "Test Title" ;
      inputDate.value = "2020-03-12" ;

      inputTitle.dispatchEvent(new Event('input'));
      inputDate.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(btnSubmit.disabled).toEqual(false);

    });

  });


});
