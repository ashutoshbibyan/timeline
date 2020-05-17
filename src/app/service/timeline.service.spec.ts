import { Notification } from './../models/notification';
import { HttpClientTestingModule  , HttpTestingController, TestRequest} from '@angular/common/http/testing';
import { AddTimelineFormModel } from './../form-data-models/add-timeline-form-model';
import { TestBed } from '@angular/core/testing';
import { TimelineService } from '../service/timeline.service';

describe('TimelineService', () => {

  let service: TimelineService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TimelineService);
  });

  afterEach( () => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should take the addTimelineForm object as a parameter ' , () => {

    let param: AddTimelineFormModel = {timelineName:"" , startingDate: new Date().getTime() , timelineType:""} ;

    let addTimelineSpy = spyOn (service , 'addTimeline');

    service.addTimeline(param);

    expect (addTimelineSpy).toHaveBeenCalledWith(param);
  });

  describe('Test The Add Timeline Rest Api at /api/timeline/add' , () => {

    let testUrl = "/api/timeline/add";


    it('when service addtimeline method execute it should call the rest api ' , () => {

      let testParam: AddTimelineFormModel = {timelineName:"test name", timelineType:"test type" , startingDate: 12345842};

      service.addTimeline(testParam).subscribe();

      let req: TestRequest = httpTestingController.expectOne(testUrl);

      expect(req).toBeTruthy();

    });

    it('when service addtimeline method execute it should call the rest api At Right Url ' , () => {

      let testParam: AddTimelineFormModel = {timelineName:"test name", timelineType:"test type" , startingDate: 12345842};

      service.addTimeline(testParam).subscribe();

      let req: TestRequest = httpTestingController.expectOne(testUrl);

      expect(req.request.url).toEqual(testUrl);

    });


    it('when service addtimeline method execute it should call the rest api With Post method  ' , () => {

      let testParam: AddTimelineFormModel = {timelineName:"test name", timelineType:"test type" , startingDate: 12345842};

      service.addTimeline(testParam).subscribe();

      let req: TestRequest = httpTestingController.expectOne(testUrl);

      expect(req.request.method).toEqual("POST");

    });

    it('should call the rest api with test param' , () => {

      let testParam: AddTimelineFormModel = {timelineName:"test name", timelineType:"test type" , startingDate: 12345842};

      service.addTimeline(testParam).subscribe();

      let req: TestRequest = httpTestingController.expectOne(testUrl);

      expect(req.request.body).toEqual(testParam);

    });


    it('should call the rest api and get the testmockresponse ' , () => {

      let testParam: AddTimelineFormModel = {timelineName:"test name", timelineType:"test type" , startingDate: 12345842};

      let testResponse: Notification = {successStatus: true , errorStatus: false , notificationMsg : "Timeline Is Added "};

      service.addTimeline(testParam).subscribe((res) => {
        expect(res).toEqual(testResponse);
      });

      let req: TestRequest = httpTestingController.expectOne(testUrl);

      req.flush(testResponse);


    });




  });

});
