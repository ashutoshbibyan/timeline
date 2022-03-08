import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from './../models/notification';
import { Page } from './../models/page';
import { of } from 'rxjs';
import { TimelineService } from './../service/timeline.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimelinesComponent } from './showtimelines.component';
import { Timeline } from '../models/timeline';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { Router } from '@angular/router';

describe('ShowtimelinesComponent', () => {
  let component: ShowtimelinesComponent;
  let fixture: ComponentFixture<ShowtimelinesComponent>;
  let timelineServiceMock: jasmine.SpyObj<TimelineService>;
  let content: Timeline[] ;
  let mockResponse: Page ;
  let getTimelineListMock ;
  let matSnackBarMock: jasmine.SpyObj<MatSnackBar>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    timelineServiceMock = jasmine.createSpyObj<TimelineService> ("TimelineService" , ["getTimelineList" , "deleteTimeline"]);
    content = [
      {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: moment.now()} ,
      {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()}
    ];

    mockResponse = {pageNo: 1 ,pageSize: 10 , noOfElements: 100 ,content,  getContent() { return this.content ; } };

    getTimelineListMock = timelineServiceMock.getTimelineList.and.returnValue(of(mockResponse));

    matSnackBarMock = jasmine.createSpyObj<MatSnackBar>("MatSnackBar" , ["open"]);

    routerMock = jasmine.createSpyObj<Router>("Router"  ,["navigateByUrl"])

    TestBed.configureTestingModule({
      declarations: [ ShowtimelinesComponent ],
      providers:[
        { provide: TimelineService , useValue: timelineServiceMock},
        { provide: MatSnackBar , useValue: matSnackBarMock},
        { provide: Router , useValue: routerMock}
      ],
      schemas:[NO_ERRORS_SCHEMA]
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

      component.timelineList = [{timelineName:"test name" , timelineType: "test type" , timelineId:"test id ", startingDate: moment.now()}];

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

    it('should show  one Mat Pagination Controls ' , () => {
      let paginator: MatPaginator[] = elAll('mat-paginator');

      expect(paginator).toBeTruthy();
      expect(paginator.length).toBe(1);

    });

    it('should show the Mat Pagination Controls with right Value of pageno and size and noOfElements' , () => {
      let paginator: MatPaginator = el('mat-paginator');

      expect(paginator.pageIndex).toBe(component.pageNo);
      expect(paginator.pageSize).toBe(component.pageSize);
      expect(paginator.length).toBe(component.noOfElements);
      expect(paginator.pageSizeOptions).toBe(component.pageSizeOptions);
    });

  });

  describe('Component Functionality ' , () => {

    it('Should Show The List of the Timeline Using Components TimelineList Veriable' , () =>{

      component.timelineList = [
        {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " ,     startingDate: moment.now()} ,
        {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " ,     startingDate: moment.now()} ,
        {timelineName: "timeline three " , timelineType: "tym typ" , timelineId:"id three " , startingDate: moment.now()}
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
        {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: moment.now()} ,

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
        {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: moment.now()} ,
        {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()}
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

    it("when deleteTimeline Method is called timeline service delete timeline method is called " , () => {

      let notification: Notification = { successStatus: true , errorStatus: false , notificationMsg: "Timeline is Deleted " } ;

      let timelineId: string = "0";

      let deleteTimelineSpy = timelineServiceMock.deleteTimeline.and.returnValue(of(notification));

      component.deleteTimeline(timelineId);

      expect(deleteTimelineSpy).toHaveBeenCalledTimes(1);
      expect(deleteTimelineSpy).toHaveBeenCalledWith(timelineId);

    });


    it('when timeline is deleted it should show the notification with success msg' , () => {

      let matSnackBarOpenSpy = matSnackBarMock.open;

      let notification: Notification = { successStatus: true , errorStatus: false , notificationMsg: "Timeline is Deleted " } ;

      let deleteTimelineSpy = timelineServiceMock.deleteTimeline.and.returnValue(of(notification));

      let timelineId: string = "0";

      component.deleteTimeline(timelineId);

      expect(matSnackBarOpenSpy).toHaveBeenCalledTimes(1);
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith(notification.notificationMsg , "Success");


    });

    it('when timeline is not deleted it should show the error msg ' , () =>{


      let matSnackBarOpenSpy = matSnackBarMock.open;

      let notification: Notification = { successStatus: false , errorStatus: true , notificationMsg: "Something Went Wrong" } ;

      let deleteTimelineSpy = timelineServiceMock.deleteTimeline.and.returnValue(of(notification));

      let timelineId: string = "0";

      component.deleteTimeline(timelineId);

      expect(matSnackBarOpenSpy).toHaveBeenCalledTimes(1);
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith(notification.notificationMsg , "Error");


    });


    it('when edit button is clicked it should call the editTimeline Method ' , () =>{

      component.timelineList = [
        {timelineName: "timeline one " , timelineType: "tym typ" , timelineId:"id one " , startingDate: moment.now()} ,
        {timelineName: "timeline two " , timelineType: "tym typ" , timelineId:"id two " , startingDate: moment.now()}
      ];

      fixture.detectChanges();

      let editTimelineSpy = spyOn (component, 'editTimeline');

      let btnEdit: HTMLButtonElement[] = elAll('[data-test="btn-edit"]');

      btnEdit.forEach((btn , index) =>{

        btn.click();
        expect(editTimelineSpy).toHaveBeenCalledWith(component.timelineList[index].timelineId);

      });

      expect(editTimelineSpy).toHaveBeenCalledTimes(2);

    });

    it('when editTimeline Method is executed it should navigate to the /timeline/edit/:id ' , () => {

      let navigateToSpy = routerMock.navigateByUrl;

      component.editTimeline("0");

      expect(navigateToSpy).toHaveBeenCalledTimes(1);

      expect(navigateToSpy).toHaveBeenCalledWith("/timeline/edit/0");

    });



  });


});
