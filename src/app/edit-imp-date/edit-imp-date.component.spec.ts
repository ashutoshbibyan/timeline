import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './../../testing/activated.route';
import { Importantdate } from './../models/importantdate';
import { of } from 'rxjs';
import { Notification } from './../models/notification';
import { DateService } from './../service/date.service';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImpDateComponent } from './edit-imp-date.component';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('EditImpDateComponent', () => {
  let component: EditImpDateComponent;
  let fixture: ComponentFixture<EditImpDateComponent>;
  let dateServiceMock: jasmine.SpyObj<DateService>;
  let acRouteStub: ActivatedRouteStub;
  let getImportantDateSpy: jasmine.Spy;
  let impDateStub: Importantdate ;
  let matSnackBarMock: jasmine.SpyObj<MatSnackBar>;


  beforeEach(async(() => {
    impDateStub = {impdateId:"test id " , timelineId: 'timeline test id ' , date: moment.now() , title:'test title'};
    acRouteStub = new ActivatedRouteStub({ id: '1'});
    dateServiceMock = jasmine.createSpyObj<DateService>('DateService' ,['updateImpDate' , 'getImportantDate']);
    getImportantDateSpy = dateServiceMock.getImportantDate.and.returnValue(of(impDateStub));
    matSnackBarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar' , ['open']);
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ EditImpDateComponent ],
      providers:[
        {provide: DateService , useValue: dateServiceMock},
        {provide: ActivatedRoute , useValue: acRouteStub},
        {provide: MatSnackBar , useValue: matSnackBarMock}

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImpDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(selector: string){
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

  describe('Component Initalization' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the edit important date form ' , () => {

      let inputDate: HTMLInputElement = el('[data-test="input-date"]');
      let inputTitle: HTMLInputElement = el('[data-test="input-title"]');
      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      expect(inputDate).toBeTruthy();
      expect(inputTitle).toBeTruthy();
      expect(btnSubmit).toBeTruthy();

      expect(inputDate.type).toEqual('date');
      expect(inputTitle.type).toEqual('text');
      expect(btnSubmit.type).toEqual('submit');

    });

    it('should get the value of the impdate id from the acroute ' , () => {

      expect(component.impDateId).toBe('1');
    });

    it('should get the important date object using the impDate id ' , () => {

      expect(getImportantDateSpy).toHaveBeenCalled();

      expect(getImportantDateSpy).toHaveBeenCalledWith(component.impDateId);

      expect(component.impDate).toEqual(impDateStub);
    });


  });

  describe('Component Functionality' , () => {

    let inputDate: HTMLInputElement ;
    let inputTitle: HTMLInputElement ;
    let dateControl: AbstractControl ;
    let titleControl: AbstractControl;
    let inputEvent: Event ;
    let dateStubValue: string;
    let titleStubValue: string;


    beforeEach(() => {
      inputDate = el('[data-test="input-date"]');
      inputTitle = el('[data-test="input-title"]');
      dateControl = component.editFormGroup.controls['dateControl'];
      titleControl = component.editFormGroup.controls['titleControl'];
      inputEvent = new Event('input');
      dateStubValue = '2020-02-20';
      titleStubValue = 'test title';
    });

    it('should have the value in the form control ' , () => {

      // date is in mm-dd-yyyy format
      inputDate.value = dateStubValue ;
      inputTitle.value = titleStubValue ;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      expect(dateControl.value).toEqual(dateStubValue);
      expect(titleControl.value).toEqual(titleStubValue);

    });

    it('should check if the date is entered of not empty' , () => {
      inputDate.value = "";

      inputDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(dateControl.valid).toBe(false);
    });

    it('should check if the date is entered of not wrong format' , () => {
      inputDate.value = "02-20-2020";

      inputDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(dateControl.valid).toBe(false);
    });

    it('should check if the date is entered is correct' , () => {
      inputDate.value = dateStubValue;

      inputDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(dateControl.valid).toBe(true);
    });


    it('should check if the title field is not empty ' , () => {
      inputTitle.value = "";

      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(titleControl.valid).toBe(false);

    });

    it('should check if the title field is not empty space ' , () => {
      inputTitle.value = "   ";

      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(titleControl.valid).toBe(false);

    });

    it('should check if the title field is correct format ' , () => {
      inputTitle.value = titleStubValue;

      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(titleControl.valid).toBe(true);

    });


    it('should check if submit button is disabled when form is not validated ' , () =>{

      inputDate.value = dateStubValue;

      inputTitle.value = '';

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      expect(btnSubmit.disabled).toBe(true);

    });


    it('should check if submit button is enabled when form is validated ' , () =>{

      inputDate.value = dateStubValue ;

      inputTitle.value = titleStubValue ;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      expect(btnSubmit.disabled).toBe(false);

    });


    it('should call the onSubmit method when save button is called ' , () =>{

      inputDate.value = dateStubValue;
      inputTitle.value = titleStubValue;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let submitMethodSpy = spyOn(component, 'onSubmit');

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      btnSubmit.click();

      expect(submitMethodSpy).toHaveBeenCalled();

    });

    it('should call the updateImpDate method of the dateService when onSubmit is executed  ' , () =>{

      let notificationStub: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'test notification msg'};

      let updateImpDateSpy = dateServiceMock.updateImpDate.and.returnValue(of(notificationStub));


      component.onSubmit();

      expect(updateImpDateSpy).toHaveBeenCalled();

    });


    it('should call the updateImpDate method of the dateService with the impdate object with new date and title value  ' , () =>{


      inputDate.value = dateStubValue ;
      inputTitle.value = titleStubValue ;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let notificationStub: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'test notification msg'};

      let updateImpDateSpy = dateServiceMock.updateImpDate.and.returnValue(of(notificationStub));


      component.onSubmit();

      expect(updateImpDateSpy).toHaveBeenCalledWith(impDateStub);

    });


    it('should show the Success notification with correct msg   ' , () =>{


      inputDate.value = dateStubValue ;
      inputTitle.value = titleStubValue ;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let notificationStub: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'Important Date is updated '};

      let updateImpDateSpy = dateServiceMock.updateImpDate.and.returnValue(of(notificationStub));

      component.onSubmit();

      let matSnackBarOpenSpy = matSnackBarMock.open;

      expect(matSnackBarOpenSpy).toHaveBeenCalled();
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith(notificationStub.notificationMsg , 'Success');

    });

    it('should show the Error notification with correct msg   ' , () =>{


      inputDate.value = dateStubValue ;
      inputTitle.value = titleStubValue ;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let notificationStub: Notification = {successStatus: false , errorStatus: true , notificationMsg: 'Error Happened While updateing'};

      let updateImpDateSpy = dateServiceMock.updateImpDate.and.returnValue(of(notificationStub));

      component.onSubmit();

      let matSnackBarOpenSpy = matSnackBarMock.open;

      expect(matSnackBarOpenSpy).toHaveBeenCalled();
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith(notificationStub.notificationMsg , 'Error');

    });

    it('form controls should have the value from the component impDate object ' , () => {

      expect(dateControl.value).toEqual(moment(impDateStub.date).format('YYYY-MM-DD'));
      expect(titleControl.value).toEqual(impDateStub.title);

    });




  });


});
