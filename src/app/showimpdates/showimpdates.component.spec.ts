import { Notification } from './../models/notification';
import { element } from 'protractor';
import { Importantdate } from './../models/importantdate';
import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowimpdatesComponent } from './showimpdates.component';
import { DateService } from '../service/date.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('ShowimpdatesComponent', () => {
  let component: ShowimpdatesComponent;
  let fixture: ComponentFixture<ShowimpdatesComponent>;
  let dateServiceMock: jasmine.SpyObj<DateService> ;
  let matSnackBarMock: jasmine.SpyObj<MatSnackBar>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    dateServiceMock = jasmine.createSpyObj<DateService>("DateService" , ["getImportantDates" , 'deleteImpDate']);
    matSnackBarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar',['open']);
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ ShowimpdatesComponent ],
      providers:[
        {provide: DateService , useValue: dateServiceMock},
        {provide: MatSnackBar , useValue: matSnackBarMock},
        {provide: Router , useValue: routerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowimpdatesComponent);
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

    it('should show the impDate and title , edit and delete button' , () => {

     component.impDates = of(
       [{impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"}
       ,{impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"}]
     );


     fixture.detectChanges();

     let impDate: HTMLElement [] = elAll('[data-test="imp-date"]');
     let impDateTitle: HTMLElement[] = elAll('[data-test="imp-date-title"]');
     let btnEdit: HTMLButtonElement [] = elAll('[data-test="btn-edit"]');
     let btnDelete: HTMLButtonElement [] = elAll('[data-test="btn-delete"]');

     expect(impDate.length).toBe(2);
     expect(impDateTitle.length).toBe(2);
     expect(btnEdit.length).toBe(2);
     expect(btnDelete.length).toBe(2);

    });


  });

  describe('Component Functionality ' , () => {

    let stubValue: Importantdate [] ;
    let getImpDatesSpy: jasmine.Spy;

    beforeEach(() => {
      stubValue = [{impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"}
      ,{impdateId: "test id " , timelineId:"test timeline", date: moment.now() , title:"Test Title"}];

      getImpDatesSpy = dateServiceMock.getImportantDates.and.returnValue(of(stubValue));
    });

    it('should call the dateservice to get the impdates ' , () => {

      expect(getImpDatesSpy).toHaveBeenCalledTimes(1);

    });


    it('should have the impDates  values got from the date service ' , () => {

      component.ngOnInit();

      fixture.detectChanges();

      component.impDates.subscribe((res) => {
        res.forEach( (element , index ) => {
          expect(element.date).toEqual(stubValue[index].date);
          expect(element.impdateId).toEqual(stubValue[index].impdateId);
          expect(element.timelineId).toEqual(stubValue[index].timelineId);
          expect(element.title).toEqual(stubValue[index].title);
        });
      });
    });

    it('should check if the delete method is called and it have correct id as parameter ' , () => {

      component.ngOnInit();

      fixture.detectChanges();

      let deleteSpy = spyOn(component , 'delete');

      let btnDelete: HTMLButtonElement [] = elAll('[data-test="btn-delete"]');

      component.impDates.subscribe((dates) => {
        dates.forEach((element, index) => {
          btnDelete[index].click();
          fixture.detectChanges();
          expect(deleteSpy).toHaveBeenCalled();
          expect(deleteSpy).toHaveBeenCalledWith(element.impdateId);
        } );
        expect(deleteSpy).toHaveBeenCalledTimes(btnDelete.length);

      });
    });

    it('should call the edit method when clicked on the edit button with correct id parameter ' , () => {

      component.ngOnInit();

      fixture.detectChanges();

      let editSpy = spyOn(component , 'edit');

      let btnEdit: HTMLButtonElement[]  = elAll('[data-test="btn-edit"]');

      component.impDates.subscribe((dates) => {
        dates.forEach((element , index) => {
          btnEdit[index].click();
          fixture.detectChanges();
          expect(editSpy).toHaveBeenCalled();
          expect(editSpy).toHaveBeenCalledWith(element.impdateId);
        });

        expect(editSpy).toHaveBeenCalledTimes(btnEdit.length);
      });
    });

    it('should call the date service delete imp date method with impDateId ' , () =>{
      let impDateId = '1';

      let notificationStub: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'imp date is deleted '};

      let deleteImpDateSpy = dateServiceMock.deleteImpDate.and.returnValue(of(notificationStub));

      fixture.detectChanges();

      component.delete(impDateId);

      expect(deleteImpDateSpy).toHaveBeenCalledTimes(1);
      expect(deleteImpDateSpy).toHaveBeenCalledWith(impDateId);

    });

    it('should show the success msg when impdate is deleted  ' , () =>{
      let impDateId = '1';

      let notificationStub: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'imp date is deleted '};

      let deleteImpDateSpy = dateServiceMock.deleteImpDate.and.returnValue(of(notificationStub));

      fixture.detectChanges();

      component.delete(impDateId);

      let matSnackBarOpenSpy = matSnackBarMock.open;

      expect(matSnackBarOpenSpy).toHaveBeenCalledTimes(1);
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith(notificationStub.notificationMsg , 'Success');

    });

    it('should show the error msg when there is an error  ' , () =>{
      let impDateId = '1';

      let notificationStub: Notification = {successStatus: false , errorStatus: true , notificationMsg: 'something went wrong while deleteing impdate  '};

      let deleteImpDateSpy = dateServiceMock.deleteImpDate.and.returnValue(of(notificationStub));

      fixture.detectChanges();

      component.delete(impDateId);

      let matSnackBarOpenSpy = matSnackBarMock.open;

      expect(matSnackBarOpenSpy).toHaveBeenCalledTimes(1);
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith(notificationStub.notificationMsg , 'Error');

    });

    it('should call the naviagte by url method when edit button is clickec' , () =>{
      let impDateId = '1';

      let navigateByUrlSpy = routerMock.navigateByUrl;

      component.edit(impDateId);

      expect(navigateByUrlSpy).toHaveBeenCalledTimes(1);
      expect(navigateByUrlSpy).toHaveBeenCalledWith(`/impdate/edit/${impDateId}`);
    });


  });


});
