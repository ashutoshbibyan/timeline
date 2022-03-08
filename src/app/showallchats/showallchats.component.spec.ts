import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from './../models/notification';
import { WhtsAppChat } from './../models/whtsAppChat';
import { WhtsappchatService } from './../service/whtsappchat.service';
import { Chat } from './../models/chat';
import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallchatsComponent } from './showallchats.component';
import * as moment from 'moment';

fdescribe('ShowallchatsComponent', () => {
  let component: ShowallchatsComponent;
  let fixture: ComponentFixture<ShowallchatsComponent>;
  let chatTitle: HTMLElement[] ;
  let chatDate : HTMLElement[];
  let btnDelete: HTMLButtonElement [] ;
  let btnEdit: HTMLButtonElement [] ;

  let chatsStub: Chat[];
  let whtsAppChatServiceMock: jasmine.SpyObj<WhtsappchatService>;
  let getAllChatsSpy : jasmine.Spy;
  let notificationStub : Notification;
  let matSnackBarMock: jasmine.SpyObj<MatSnackBar>;
  let routerMock: jasmine.SpyObj<Router>;
  let chatIdStub : string;


  beforeEach(async(() => {
    chatsStub = [{chatDate: moment.now() , chatTitle: ' test title one ' , chatId: 'test chat id ' } ,
                {chatDate: moment.now() , chatTitle: 'chat test title two ' , chatId: 'test chat id'}];
    whtsAppChatServiceMock = jasmine.createSpyObj<WhtsappchatService>('WhtsappchatService' , ['getAllChats' ,'deleteChat']);
    matSnackBarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar' , ['open']);
    routerMock = jasmine.createSpyObj<Router>('Router' , ['navigateByUrl']);
    getAllChatsSpy = whtsAppChatServiceMock.getAllChats.and.returnValue(of(chatsStub));
    TestBed.configureTestingModule({
      declarations: [ ShowallchatsComponent ],
      providers:[
        {provide: WhtsappchatService , useValue: whtsAppChatServiceMock},
        {provide: MatSnackBar , useValue: matSnackBarMock},
        {provide: Router , useValue: routerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallchatsComponent);
    component = fixture.componentInstance;
    notificationStub = {successStatus: true , errorStatus: false , notificationMsg: 'success '};
    chatIdStub = 'test chat id ' ;
    fixture.detectChanges();
  });

  function elAll(selector: string){
    return fixture.debugElement.nativeElement.querySelectorAll(selector);
  }

  describe('Component Initalization ' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the chats ' , () => {

      component.chats = of(chatsStub);

      fixture.detectChanges();

      chatTitle = elAll('[data-test="chat-title"]');
      chatDate  = elAll('[data-test="chat-date"]');
      btnEdit = elAll('[data-test = "btn-edit"]');
      btnDelete = elAll('[data-test="btn-delete"]');

      expect(chatTitle.length).toEqual(chatsStub.length);
      expect(chatDate.length).toEqual(chatsStub.length);
      expect(btnEdit.length).toEqual(chatsStub.length);
      expect(btnDelete.length).toEqual(chatsStub.length);

    });

    it('should check if the view have the value from the component chat variable ' , () =>{

      component.chats = of(chatsStub);

      fixture.detectChanges();

      chatTitle = elAll('[data-test="chat-title"]');
      chatDate  = elAll('[data-test="chat-date"]');

      chatTitle.forEach((item , index ) => {
        expect(item.textContent.trim()).toEqual(chatsStub[index].chatTitle.trim());
      });

      chatDate.forEach((item , index ) => {
        expect(item.textContent.trim()).toEqual(moment(chatsStub[index].chatDate).format('MMM DD, YYYY').trim());
      });

    });


  });

  describe('Component functionality  ' , () => {

    it('should call the whtsappchat service to get the list of the chats ' , () => {

      expect(getAllChatsSpy).toHaveBeenCalledTimes(1);

    });

    it('component chats variable should have the stub value ' , () => {

      component.chats.subscribe((res) => {
        res.forEach((chat , index ) => {
          expect(chat.chatTitle).toEqual(chatsStub[index].chatTitle);
          expect(chat.chatDate).toEqual(chatsStub[index].chatDate);

        });
      });
    });

    it('should call the edit method when clicked on the edit button ' , () => {

      let editSpy = spyOn(component , 'edit');

      component.chats = of(chatsStub);

      fixture.detectChanges();

      btnEdit = elAll('[data-test="btn-edit"]');

      btnEdit.forEach((button , index ) => {
        button.click();
        expect(editSpy).toHaveBeenCalledWith(chatsStub[index].chatId);
      });

      expect(editSpy).toHaveBeenCalledTimes(chatsStub.length);

    });


    it('should call the Delete method when clicked on the Delete button ' , () => {


      let deleteSpy = spyOn(component , 'delete');

      component.chats = of(chatsStub);

      fixture.detectChanges();

      btnDelete = elAll('[data-test="btn-delete"]');

      btnDelete.forEach((button , index ) => {
        button.click();
        expect(deleteSpy).toHaveBeenCalledWith(chatsStub[index].chatId);
      });

      expect(deleteSpy).toHaveBeenCalledTimes(chatsStub.length);


    });


    it('should call the deleteChat of the service when delete method is called  ' , () => {


      let deleteChatSpy = whtsAppChatServiceMock.deleteChat.and.returnValue(of(notificationStub));

      fixture.detectChanges();

      component.delete(chatIdStub);

      expect(deleteChatSpy).toHaveBeenCalledTimes(1);
      expect(deleteChatSpy).toHaveBeenCalledWith(chatIdStub);

    });

    it('should show the success notification when the chat is deleted ' , () => {


      let deleteChatSpy = whtsAppChatServiceMock.deleteChat.and.returnValue(of(notificationStub));

      fixture.detectChanges();

      component.delete(chatIdStub);

      let snackBarOpenSpy = matSnackBarMock.open;

      fixture.detectChanges();

      expect(snackBarOpenSpy).toHaveBeenCalledTimes(1);
      expect(snackBarOpenSpy).toHaveBeenCalledWith( notificationStub.notificationMsg , 'Success');

    });

    it('should show the error notification if there is some error ' , () => {


      notificationStub.successStatus = false ;
      notificationStub.errorStatus = true ;
      notificationStub.notificationMsg = 'error while deleting chat ' ;

      let deleteChatSpy = whtsAppChatServiceMock.deleteChat.and.returnValue(of(notificationStub));

      fixture.detectChanges();

      component.delete(chatIdStub);

      let snackBarOpenSpy = matSnackBarMock.open;

      fixture.detectChanges();

      expect(snackBarOpenSpy).toHaveBeenCalledTimes(1);
      expect(snackBarOpenSpy).toHaveBeenCalledWith(notificationStub.notificationMsg , 'Error');

    });

    it('should navigate to the chat edit page when edit method run ' , () => {

      let url = `/chat/edit/${chatIdStub}`;

      let navigateSpy = routerMock.navigateByUrl;

      fixture.detectChanges();

      component.edit(chatIdStub);

      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(url);



    });





  });



});
