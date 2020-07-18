import { WhtsappchatService } from './../service/whtsappchat.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './../../testing/activated.route';
import { of } from 'rxjs';
import { WhtsAppChat } from './../models/whtsAppChat';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowwhtsappchatComponent } from './showwhtsappchat.component';
import * as moment from 'moment';

describe('ShowwhtsappchatComponent', () => {
  let component: ShowwhtsappchatComponent;
  let fixture: ComponentFixture<ShowwhtsappchatComponent>;

  let date: HTMLElement [];
  let time: HTMLElement [];
  let sender: HTMLElement[];
  let message: HTMLElement[];
  let whtsAppChatListStub : WhtsAppChat [] ;
  let acRouteStub : ActivatedRouteStub ;
  let whtsAppChatServiceMock: jasmine.SpyObj<WhtsappchatService>;
  let getWhtsAppChatSpy : jasmine.Spy ;

  function el(selector: string){
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

  function elAll(selector: string){
    return fixture.debugElement.nativeElement.querySelectorAll(selector);
  }


  beforeEach(async(() => {
    acRouteStub = new ActivatedRouteStub({'id':'2','date':'84785157'});
    whtsAppChatServiceMock = jasmine.createSpyObj<WhtsappchatService>('WhtsappchatService' , ['getWhtsAppChat']);
    whtsAppChatListStub = [{date: moment.now() , time: 'test time ' , sender: 'test sender ' , message: 'test message ' } ,
                           {date: moment.now() , time:'test time ' , sender:'test sender ' , message:'test message '}]
    getWhtsAppChatSpy = whtsAppChatServiceMock.getWhtsAppChat.and.returnValue(of(whtsAppChatListStub));
    TestBed.configureTestingModule({
      declarations: [ ShowwhtsappchatComponent ],
      providers:[
        {provide: ActivatedRoute , useValue: acRouteStub},
        {provide: WhtsappchatService , useValue: whtsAppChatServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowwhtsappchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('component initalization ' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the whtsapp messages ' , () => {

      component.whtsAppChat = of(whtsAppChatListStub);

      fixture.detectChanges();

      date = elAll('[data-test="date"]');
      time = elAll('[data-test="time"]');
      sender = elAll('[data-test="sender"]');
      message = elAll('[data-test="message"]');

      expect(date.length).toEqual(2);
      expect(time.length).toEqual(2);
      expect(sender.length).toEqual(2);
      expect(message.length).toEqual(2);

      date.forEach((item,index) => {
        expect( item.textContent.trim() ).toEqual(moment( whtsAppChatListStub[index].date).format('MMM DD, YYYY').trim() );
      });

      time.forEach((item , index ) => {
        expect(item.textContent.trim()).toEqual(whtsAppChatListStub[index].time.trim());
      });

      sender.forEach((item,index) =>{
        expect(item.textContent.trim()).toEqual(whtsAppChatListStub[index].sender.trim());
      });

      message.forEach((item , index) => {
        expect(item.textContent.trim()).toEqual(whtsAppChatListStub[index].message.trim());
      });

    });



   });

  describe('Component Functionality ' , () => {

    it('should get the chat id from the url parameter ' , () => {


      expect(component.chatId).toEqual('2');

    });

    it('should get the chat date from the url parameter ' , () => {
      expect(component.chatDate).toEqual('84785157');
    });


    it('should call the whtsapp service getWhtsappChat method to get the chat ' , () => {

      component.ngOnInit();

      fixture.detectChanges();

      component.whtsAppChat.subscribe((res) => {
        res.forEach((item , index ) => {
          expect(item).toEqual(whtsAppChatListStub[index]);
        });
      });

    });




   });
});
