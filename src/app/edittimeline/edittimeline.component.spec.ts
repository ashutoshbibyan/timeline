import { ActivatedRouteStub } from './../../testing/activated.route';
import { Timeline } from './../models/timeline';
import { of } from 'rxjs';
import { Notification } from './../models/notification';
import { ReactiveFormsModule } from '@angular/forms';
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
    timelineStubValue = {timelineName: "test Name " , timelineType: "test Type " , timelineId: "0" , startingDate: moment.now()};
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



  });
});
