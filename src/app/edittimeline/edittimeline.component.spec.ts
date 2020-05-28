import { ActivatedRouteStub } from './../../testing/activated.route';
import { Timeline } from './../models/timeline';
import { of } from 'rxjs';
import { Notification } from './../models/notification';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittimelineComponent } from './edittimeline.component';
import { TimelineService } from '../service/timeline.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from "moment";

describe('EdittimelineComponent', () => {
  let component: EdittimelineComponent;
  let fixture: ComponentFixture<EdittimelineComponent>;
  let timelineServiceMock: jasmine.SpyObj<TimelineService>;
  let acRouteStub: ActivatedRouteStub ;
  let timelineStubValue: Timeline ;
  let getTimelineSpy ;
  beforeEach(async(() => {
    timelineServiceMock = jasmine.createSpyObj<TimelineService>("TimelineService" , ["saveTimeline" , "getTimeline"]);
    acRouteStub = new ActivatedRouteStub({id : "0"});
    timelineStubValue = {timelineName: "test Name " , timelineType: "test Type " , timelineId: "0" ,
    startingDate: moment().startOf("day").valueOf()};
    // it is declared here so ngOnInit get the response
    getTimelineSpy = timelineServiceMock.getTimeline.and.returnValue(of(timelineStubValue));

    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ EdittimelineComponent ] ,
      providers:[
        { provide: TimelineService , useValue: timelineServiceMock},
        { provide: ActivatedRoute  , useValue: acRouteStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(selector: string){
    return fixture.debugElement.nativeElement.querySelector(selector);
  }


  describe('Component Initalization ' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the Edit TimeLine Form ' , () => {
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

    it('input field should have the value of the timeline object got from db ' , () => {

      // adding the component timeline type into the list so test can select it
      component.timelineTypes.push(component.timeline.timelineType);

      fixture.detectChanges();

      let inputTimelineName: HTMLInputElement = el('[data-test="input-timeline-name"]');
      let inputStartingDate: HTMLInputElement = el('[data-test="input-starting-date"]');
      let selectTimelineType: HTMLSelectElement = el('[data-test="select-timeline-type"]');

      expect(inputTimelineName.value).toEqual(component.timeline.timelineName);

      // slice the date into yyyy-mm-dd format for input field only need the date information
      expect(inputStartingDate.value).toEqual(moment(component.timeline.startingDate).toISOString().slice(0,10));


      expect(selectTimelineType.value).toEqual(component.timeline.timelineType);


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

  describe('Component Functionality' , () => {

    it('Component should have the value of the timeline name in the formgroup', () => {
      let testValue = "Picture";
      let inputTimelineName: HTMLInputElement = el('[data-test="input-timeline-name"]');

      inputTimelineName.value = testValue;

      inputTimelineName.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.timelineFormgroup.controls['timelineName'].value).toEqual(testValue);

    });

    it('Component should have the value of the starting date in the formgroup', () => {
      let testValue = "2020-02-02";
      let inputStartingDate: HTMLInputElement = el('[data-test="input-starting-date"]');

      inputStartingDate.value = testValue;
      inputStartingDate.dispatchEvent(new Event('input'));

      fixture.detectChanges();

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

      fixture.detectChanges();

      expect(component.timelineFormgroup.controls['selectTimelineType'].value).toEqual(testValue);

    });

    it('After Form is submited the onSubmit method should be called ' , () => {

      let onSubmitSpy = spyOn(component , "onSubmit");

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      btnSubmit.click();

      expect(onSubmitSpy).toHaveBeenCalledTimes(1);

    });

    it('should get the timeline id from the activated route ' , () => {

      acRouteStub.setParamMap({id:"1"});
      expect(component.timelineId).toBe("1");

    });

    it('should call the timeline service getTimeline method and get the timeline using id ' , () => {

      expect(getTimelineSpy).toHaveBeenCalledTimes(1);
      expect(getTimelineSpy).toHaveBeenCalledWith(component.timelineId);
      expect(component.timeline).toEqual(timelineStubValue);

    });


    it('OnSubmit method should call the timeline service Save timeline method ' , () => {


      let saveTimelineSpy = timelineServiceMock.saveTimeline;

      component.onSubmit();

      expect(saveTimelineSpy).toHaveBeenCalledTimes(1);


    });

    it('should call the saveTimeline method with the value of the form field ' , () => {

      let timelineStub2: Timeline = {timelineName:"name", timelineId:"0" , timelineType: "typ" ,
      startingDate: moment().startOf("day").valueOf()};

      let inputTimelineName: HTMLInputElement = el('[data-test="input-timeline-name"]');
      let inputStartingDate: HTMLInputElement = el('[data-test="input-starting-date"]');
      let selectTimelineType: HTMLSelectElement = el('[data-test="select-timeline-type"]');

      inputTimelineName.value = timelineStub2.timelineName;
      inputTimelineName.dispatchEvent(new Event("input"));

      inputStartingDate.value = moment(timelineStub2.startingDate).format("YYYY-MM-DD");
      inputStartingDate.dispatchEvent(new Event("input"));

      // add value into the select list
      component.timelineTypes.push(timelineStub2.timelineType);
      fixture.detectChanges();

      selectTimelineType.value = timelineStub2.timelineType;
      selectTimelineType.dispatchEvent(new Event("change"));

      fixture.detectChanges();

      let saveTimelineSpy = timelineServiceMock.saveTimeline;

      component.onSubmit();

      expect(saveTimelineSpy).toHaveBeenCalledWith(timelineStub2);

    });


  });

  fdescribe('EditTimeline form Validation' , () => {

    describe('TimelineName input field ' , () => {

      let inputTimelineName: HTMLInputElement ;
      let inputEvent: Event;

      beforeEach( () =>{

        inputTimelineName = el('[data-test="input-timeline-name"]');
        inputEvent = new Event ('input');

      });


      it('timelineName Should Not Be Empty' , () =>{

        inputTimelineName.value = "" ;
        inputTimelineName.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(component.timelineFormgroup.controls['timelineName'].valid).toBe(false);

      });

      it('timelineName Should Not Be just  Empty space '  , () =>{

        inputTimelineName.value = "       " ;
        inputTimelineName.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(component.timelineFormgroup.controls['timelineName'].valid).toBe(false);

      });


      it('timelineName valid should be true when input is correct ' , () =>{

        inputTimelineName.value = "something" ;
        inputTimelineName.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(component.timelineFormgroup.controls['timelineName'].valid).toBe(true);

      });


    });


    describe('StartingDate input field ' , () => {

      let inputStartingDate: HTMLInputElement ;
      let inputEvent: Event;

      beforeEach( () =>{

        inputStartingDate = el('[data-test="input-starting-date"]');
        inputEvent = new Event ('input');

      });


      it('StartingDate Should Not Be Empty' , () =>{

        inputStartingDate.value = "" ;
        inputStartingDate.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(component.timelineFormgroup.controls['startingDate'].valid).toBe(false);

      });

      it('StartingDate Should Not Be just  Empty space '  , () =>{

        inputStartingDate.value = "       " ;
        inputStartingDate.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(component.timelineFormgroup.controls['startingDate'].valid).toBe(false);

      });


      it('StartingDate valid should be true when input is correct ' , () =>{

        inputStartingDate.value = "2020-02-01" ;
        inputStartingDate.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(component.timelineFormgroup.controls['startingDate'].valid).toBe(true);

      });


      it('StartingDate valid should be false when date is not in YYYY-MM-DD format ' , () =>{

        inputStartingDate.value = "01-02-2020" ;
        inputStartingDate.dispatchEvent(inputEvent);

        fixture.detectChanges();

        expect(component.timelineFormgroup.controls['startingDate'].valid).toBe(false);

      });



    });


    describe('TimelineType input field ' , () => {

      let inputTimelineType: HTMLSelectElement ;
      let changeEvent: Event;
      let timelineTypeControl: AbstractControl ;

      beforeEach( () =>{

        inputTimelineType = el('[data-test="select-timeline-type"]');
        changeEvent = new Event ('change');
        timelineTypeControl = component.timelineFormgroup.controls['selectTimelineType'];

      });


      it('timeline  Should Not Be Empty' , () =>{

        inputTimelineType.selectedIndex = -1 ;
        inputTimelineType.dispatchEvent(changeEvent);

        fixture.detectChanges();

        expect(timelineTypeControl.valid).toBe(false);

      });

      it('timelineName valid should be true when input is correct  '  , () =>{

        let testValue = "test";

        component.timelineTypes.push(testValue);

        fixture.detectChanges();

        inputTimelineType.value = testValue;
        inputTimelineType.dispatchEvent(changeEvent);

        fixture.detectChanges();

        expect(timelineTypeControl.valid).toBe(true);
        expect(timelineTypeControl.value).toEqual(testValue);

      });

    });


    describe("submit button Validation " , () => {

      let inputTimelineName: HTMLInputElement;
      let inputStartingDate: HTMLInputElement ;
      let selectTimelineType: HTMLSelectElement ;
      let btnSubmit: HTMLButtonElement ;

      let inputEvent: Event;
      let changeEvent: Event;

      beforeEach(() =>{

        inputTimelineName  = el('[data-test="input-timeline-name"]');
        inputStartingDate  = el('[data-test="input-starting-date"]');
        selectTimelineType = el('[data-test="select-timeline-type"]');
        btnSubmit          = el('[data-test="btn-submit"]');

        inputEvent  = new Event ('input');
        changeEvent = new Event ('change');

      });

      it('submit button should be disabled when there are validation errors ' , () =>{

        inputTimelineName.value =  "" ;
        inputTimelineName.dispatchEvent(inputEvent);
        inputStartingDate.value =  "" ;
        inputStartingDate.dispatchEvent(inputEvent);
        selectTimelineType.selectedIndex = -1;
        selectTimelineType.dispatchEvent(changeEvent);

        fixture.detectChanges();

        expect(btnSubmit.disabled).toBe(true);


      });

      it('submit button should be active when there are No validation errors ' , () =>{

        component.timelineTypes.push("test");
        fixture.detectChanges();

        inputTimelineName.value =  "test" ;
        inputTimelineName.dispatchEvent(inputEvent);
        inputStartingDate.value =  "2020-02-01" ;
        inputStartingDate.dispatchEvent(inputEvent);
        selectTimelineType.value = "test";
        selectTimelineType.dispatchEvent(changeEvent);

        fixture.detectChanges();

        expect(btnSubmit.disabled).toBe(false);


      });


    });



  });


});
