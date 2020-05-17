import { AddTimelineFormModel } from './../form-data-models/add-timeline-form-model';
import { of } from 'rxjs';
import { TimelineService } from './../service/timeline.service';
import { ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtimelineComponent } from './addtimeline.component';
import { Notification } from '../models/notification';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('AddtimelineComponent', () => {
  let component: AddtimelineComponent;
  let fixture: ComponentFixture<AddtimelineComponent>;
  let timelineServiceMock: jasmine.SpyObj<TimelineService> ;
  let matSnackbarMock: jasmine.SpyObj<MatSnackBar> ;


  beforeEach(async(() => {
    timelineServiceMock = jasmine.createSpyObj<TimelineService>("TimelineService" , ["addTimeline"]);
    matSnackbarMock  = jasmine.createSpyObj<MatSnackBar>("MatSnackBar" , ["open"]);
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ AddtimelineComponent ],
      providers:[
        {provide: TimelineService , useValue: timelineServiceMock},
        {provide: MatSnackBar , useValue: matSnackbarMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AddtimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(selector: string){
    return fixture.debugElement.nativeElement.querySelector(selector);
  }


  describe('Component Initalization' ,  () => {



    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the add TimeLine Form ' , () => {
      let inputTimelineName: HTMLInputElement = el('[data-test="input-timeline-name"]');
      let inputStartingDate: HTMLInputElement = el('[data-test="input-starting-date"]');
      let selectTimelineType: HTMLSelectElement = el('[data-test="select-timeline-type"]');
      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      expect(inputTimelineName).toBeTruthy();
      expect(inputStartingDate).toBeTruthy();
      expect(selectTimelineType).toBeTruthy();
      expect(btnSubmit).toBeTruthy();

      expect(inputTimelineName.type).toEqual('text');
      expect(inputStartingDate.type).toEqual('date');
      expect(btnSubmit.type).toEqual('submit');

    });

    it('Timeline type should have the render the options ' , () => {

      let testValue = ['Whtsapp','Dates',"child"];

      component.timelineTypes = testValue;

      fixture.detectChanges();

      let selectTimelineType: HTMLSelectElement = el('[data-test="select-timeline-type"]');

      expect(testValue.length).toEqual(selectTimelineType.length);

      selectTimelineType.childNodes.forEach((node: HTMLOptionElement , index) => {

        expect(node.value).toEqual(testValue[index]);

      });
    });



  });


  describe('Component Fucntionality' , () => {

    it('Component should have the value of the timeline name in the formgroup', () => {
      let testValue = "Picture";
      let inputTimelineName: HTMLInputElement = el('[data-test="input-timeline-name"]');

      inputTimelineName.value = testValue;

      inputTimelineName.dispatchEvent(new Event('input'));

      expect(component.timelineFormgroup.controls['timelineName'].value).toEqual(testValue);

    });

    it('Component should have the value of the starting date in the formgroup', () => {
      let testValue = "2020-02-02";
      let inputStartingDate: HTMLInputElement = el('[data-test="input-starting-date"]');

      inputStartingDate.value = testValue;
      inputStartingDate.dispatchEvent(new Event('input'));

      expect(component.timelineFormgroup.controls['startingDate'].value).toEqual(testValue);

    });


    it('Component should have the value of the timeline type in the formgroup', () => {

      let testValue = "volvo";

      // add out test value into the list of select tag
      component.timelineTypes.push('volvo');

      fixture.detectChanges();

      let selectTimelineType: HTMLInputElement = el('[data-test="select-timeline-type"]');

      selectTimelineType.value = testValue;

      selectTimelineType.dispatchEvent(new Event('change'));

      expect(component.timelineFormgroup.controls['selectTimelineType'].value).toEqual(testValue);

    });

    it('After Form is submited the onSubmit method should be called ' , () => {

      let onSubmitSpy = spyOn(component , 'onSubmit');

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      btnSubmit.disabled = false ;

      btnSubmit.click();

      expect(onSubmitSpy).toHaveBeenCalled();
    });


    it('OnSubmit method should call the timeline service add timeline method ' , () => {

      let testValue: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'timeline is added '};

      let addTimelineMock = timelineServiceMock.addTimeline.and.returnValue(of(testValue));

      component.onSubmit();

      expect(addTimelineMock).toHaveBeenCalled();

    });

    it('OnSubmit method should call the timeline service add timeline method with field value in the addtimelineformmodel object ' , () => {

      let resValue: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'timeline is added '};


      let testValue: AddTimelineFormModel = {timelineName: 'whtsapp' , timelineType: 'chat' ,
      startingDate: new Date('2020-02-02').getTime()};

      component.timelineFormgroup.controls['timelineName'].setValue(testValue.timelineName);
      component.timelineFormgroup.controls['startingDate'].setValue(testValue.startingDate.toString());
      component.timelineFormgroup.controls['selectTimelineType'].setValue(testValue.timelineType);

      let addTimelineMock = timelineServiceMock.addTimeline.and.returnValue(of(resValue));

      component.onSubmit();

      expect(addTimelineMock).toHaveBeenCalledWith(testValue);

    });

    it('When Timeline is added Notification is shown using snackbar' , () => {

      let testValue: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'timeline is added '};

      timelineServiceMock.addTimeline.and.returnValue(of(testValue));

      component.onSubmit();

      expect(matSnackbarMock.open).toHaveBeenCalled();

      expect(matSnackbarMock.open).toHaveBeenCalledWith(testValue.notificationMsg , "Success");

    });

    it('When Timeline is Not added Notification Should Show The Error' , () => {

      let testValue: Notification = {successStatus: false , errorStatus: true , notificationMsg: ' something Went Wrong '};

      timelineServiceMock.addTimeline.and.returnValue(of(testValue));

      component.onSubmit();

      expect(matSnackbarMock.open).toHaveBeenCalled();

      expect(matSnackbarMock.open).toHaveBeenCalledWith(testValue.notificationMsg , "Error");

    });



  });

  describe('TimeLine Form Validation' , () => {

    describe('TimeLine Name Validation ' , () => {

      let inputTimelineName : HTMLInputElement ;
      let inputEvent: Event ;
      let timelineController: AbstractControl ;

      beforeEach(() => {
        inputTimelineName =  el('[data-test="input-timeline-name"]');
        inputEvent = new Event('input');
        timelineController = component.timelineFormgroup.controls['timelineName'] ;
      });

      it('TimeLine Name Valid should be false when it is not entered ' , () => {

        let testValue = "";

        inputTimelineName.value = testValue ;

        inputTimelineName.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(timelineController.valid).toBe(false);

      });

      it('TimeLine Name Valid should be false when it is just empty space ' , () => {
        let testValue = "    ";

        inputTimelineName.value = testValue ;

        inputTimelineName.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(timelineController.valid).toBe(false);

      });

      it('TimeLine Name Valid should be true when timelinename is entered  ' , () => {

        let testValue = "whatsapp";

        inputTimelineName.value = testValue ;

        inputTimelineName.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(timelineController.valid).toBe(true);

      });

    });

    describe('Starting Date Validation' , () => {

      let inputStartingDate : HTMLInputElement ;

      let inputEvent: Event ;

      let startingDateController: AbstractControl ;

      beforeEach(() => {

        inputStartingDate = el('[data-test="input-starting-date"]');
        inputEvent = new Event('input');
        startingDateController = component.timelineFormgroup.controls['startingDate'] ;

      });

      it('Starting Date Valid should be false when it is not Selected ' , () => {

        let testValue = "";

        inputStartingDate.value = testValue ;

        inputStartingDate.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(startingDateController.valid).toBe(false);

      });


      it('Starting Date Valid should be false when it is not in write format ' , () => {
        let testValue = "2-2-2020";

        inputStartingDate.value = testValue ;

        inputStartingDate.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(startingDateController.valid).toBe(false);

      });

      it('Starting Date Valid should be true when it is entered correctly ' , () => {
        let testValue = "2020-02-02";

        inputStartingDate.value = testValue ;

        inputStartingDate.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(startingDateController.valid).toBe(true);

      });


    });


    describe('Timeline Type Validation' , () => {

      let selectTimelineType: HTMLSelectElement ;

      let changeEvent: Event ;

      let timelineTypeController: AbstractControl ;

      beforeEach(() => {

        selectTimelineType = el('[data-test="select-timeline-type"]');

        changeEvent = new Event ('change');

        timelineTypeController = component.timelineFormgroup.controls['selectTimelineType'];


      });

      it('Timeline Type Validation valid should be true when type is selected ' , () => {

        let testValue = "volvo";

        // add out test value into the list of select tag
        component.timelineTypes.push('volvo');

        fixture.detectChanges();

        selectTimelineType.value = testValue;

        selectTimelineType.dispatchEvent(changeEvent);

        expect(timelineTypeController.valid).toEqual(true);

      });

      it('Timeline Name Validation valid should be false when type is not Selected ' , () => {


        selectTimelineType.selectedIndex = -1 ;

        selectTimelineType.dispatchEvent(new Event('change'));

        fixture.detectChanges();

        expect(timelineTypeController.valid).toEqual(false);

      });

    });

    describe('Submit Button Validation ' , () => {

      let btnSubmit: HTMLButtonElement ;
      let inputTimelineName: HTMLInputElement ;
      let inputStartingDate: HTMLInputElement ;
      let selectTimelineType: HTMLSelectElement ;

      let inputEvent: Event ;
      let changeEvent: Event ;

      beforeEach(() => {

        btnSubmit = el('[data-test="btn-submit"]');

        inputTimelineName = el('[data-test="input-timeline-name"]');
        inputStartingDate = el('[data-test="input-starting-date"]');
        selectTimelineType = el('[data-test="select-timeline-type"]');
        inputEvent = new Event('input');
        changeEvent = new Event('change');

      });

      it('Submit Button Should be disabled when there are validation errors ' , () => {

        inputTimelineName.value="";
        inputStartingDate.value="";
        selectTimelineType.selectedIndex = -1;

        inputTimelineName.dispatchEvent(inputEvent);
        inputStartingDate.dispatchEvent(inputEvent);
        selectTimelineType.dispatchEvent(changeEvent);

        fixture.detectChanges();

        expect(btnSubmit.disabled).toEqual(true);

      });

      it('Submit Button Should be Active when there are No validation errors ' , () => {

        component.timelineTypes.push("Test Value");

        fixture.detectChanges();

        inputTimelineName.value="Test Name";
        inputStartingDate.value="2020-02-02";
        selectTimelineType.selectedIndex = 0 ;

        inputTimelineName.dispatchEvent(inputEvent);
        inputStartingDate.dispatchEvent(inputEvent);
        selectTimelineType.dispatchEvent(changeEvent);

        fixture.detectChanges();

        expect(btnSubmit.disabled).toEqual(false);

      });


      });


    });


});
