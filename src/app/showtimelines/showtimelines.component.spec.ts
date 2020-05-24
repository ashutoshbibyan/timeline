import { Page } from './../models/page';
import { of } from 'rxjs';
import { TimelineService } from './../service/timeline.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimelinesComponent } from './showtimelines.component';
import { Timeline } from '../models/timeline';

describe('ShowtimelinesComponent', () => {
  let component: ShowtimelinesComponent;
  let fixture: ComponentFixture<ShowtimelinesComponent>;
  let timelineServiceMock: jasmine.SpyObj<TimelineService>;
  let content: Timeline[] ;
  let mockResponse: Page ;
  let getTimelineListMock ;
  beforeEach(async(() => {
    timelineServiceMock = jasmine.createSpyObj<TimelineService> ("TimelineService" , ["getTimelineList"]);
    content = [
      {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: new Date()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: new Date()}
    ];

    mockResponse = {pageNo: 1 ,pageSize: 10 , noOfElements: 100 ,content,  getContent() { return this.content ; } };

    getTimelineListMock = timelineServiceMock.getTimelineList.and.returnValue(of(mockResponse));

    TestBed.configureTestingModule({
      declarations: [ ShowtimelinesComponent ],
      providers:[
        { provide: TimelineService , useValue: timelineServiceMock}
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(selector: string){
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

  function elAll(selector: string){
    return fixture.debugElement.nativeElement.querySelectorAll(selector);
  }

  describe('Component Initalization ' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the list of the timeline ' , () => {

      component.timelineList = [{timelineName:"test name" , timelineType: "test type" , timelineId:"test id ", startingDate: new Date()}];

      fixture.detectChanges();

      let timeline = el('[data-test="timeline"]');
      let timelineName = el('[data-test="timeline-name"]');
      let timelineType = el('[data-test="timeline-type"]');
      let btnEdit: HTMLButtonElement = el('[data-test="btn-edit"]');
      let btnDelete: HTMLButtonElement = el('[data-test="btn-delete"]');


      expect(timeline).toBeTruthy();
      expect(timelineName).toBeTruthy();
      expect(timelineType).toBeTruthy();
      expect(btnEdit).toBeTruthy();
      expect(btnDelete).toBeTruthy();

      expect(timelineName.innerText).toEqual(component.timelineList[0].timelineName);
      expect(timelineType.innerText).toEqual(component.timelineList[0].timelineType);
      expect(btnEdit.innerText).toEqual("Edit");
      expect(btnDelete.innerText).toEqual("Delete");

    });

  });

  describe('Component Functionality ' , () => {

    it('Should Show The List of the Timeline Using Components TimelineList Veriable' , () =>{

      component.timelineList = [
        {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: new Date()} ,
        {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: new Date()} ,
        {timelineName: "timeline three " , timelineType: "tym typ" , timelineId:"id three " , startingDate: new Date()}
      ];

      fixture.detectChanges();

      let timeline = elAll('[data-test="timeline"]');
      let timelineName = elAll('[data-test="timeline-name"]');
      let timelineType = elAll('[data-test="timeline-type"]');
      let btnEdit: HTMLButtonElement []= elAll('[data-test="btn-edit"]');
      let btnDelete: HTMLButtonElement [] = elAll('[data-test="btn-delete"]');


      expect(timeline.length).toEqual(component.timelineList.length);
      expect(timelineName.length).toEqual(component.timelineList.length);
      expect(timelineType.length).toEqual(component.timelineList.length);
      expect(btnEdit.length).toEqual(component.timelineList.length);
      expect(btnDelete.length).toEqual(component.timelineList.length);


    });

    it('should call the timelineService getTimelineList method on ngOnInit and put the list in component timelineList ' , () => {

      expect(getTimelineListMock).toHaveBeenCalledTimes(1);

    });

    it('should put the mock value of the api reponse into pageNo , pageSize , timelineList ' , () => {

      expect(component.timelineList).toEqual(content);
      expect(component.pageNo).toEqual(mockResponse.pageNo);
      expect(component.pageSize).toEqual(mockResponse.pageSize);
      expect(component.noOfElements).toEqual(mockResponse.noOfElements);

    });

    it('When Delete Button is Clicked it should execute the deleteTimeline Method ' , () => {

      component.timelineList = [
        {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: new Date()} ,

      ];

      fixture.detectChanges();

      let btnDelete: HTMLButtonElement [] = elAll('[data-test="btn-delete"]');

      let deleteTimeline = spyOn(component , "deleteTimeline");

      btnDelete.forEach( (btn) => {

        btn.click();

      });

      expect(deleteTimeline).toHaveBeenCalledTimes(component.timelineList.length);

    });

    it('When Delete Button is Clicked it should execute the deleteTimeline Method with timelineId as parameter' , () => {

      component.timelineList = [
        {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: new Date()} ,
        {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: new Date()}
      ];

      fixture.detectChanges();

      let btnDelete: HTMLButtonElement [] = elAll('[data-test="btn-delete"]');

      let deleteTimeline = spyOn(component , "deleteTimeline");

      btnDelete.forEach( (btn , index) => {

        btn.click();
        expect(deleteTimeline).toHaveBeenCalledWith(component.timelineList[index].timelineId);

      });

      expect(deleteTimeline).toHaveBeenCalledTimes(component.timelineList.length);

    });




  });


});
