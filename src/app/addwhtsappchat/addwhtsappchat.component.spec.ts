import { MatSnackBar } from '@angular/material/snack-bar';
import { WhtsAppChatForm } from './../models/whtsAppChatForm';
import { of } from 'rxjs';
import { Notification } from './../models/notification';
import { FileListStub } from './../../testing/fileliststub';
import { AbstractControl , ReactiveFormsModule} from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwhtsappchatComponent } from './addwhtsappchat.component';

import * as moment from 'moment' ;
import { WhtsappchatService } from '../service/whtsappchat.service';

fdescribe('AddwhtsappchatComponent', () => {
  let component: AddwhtsappchatComponent;
  let fixture: ComponentFixture<AddwhtsappchatComponent>;


  let inputChatTitle: HTMLInputElement;
  let inputChatDate: HTMLInputElement ;
  let inputChatFile: HTMLInputElement ;
  let btnSubmit: HTMLButtonElement ;

  let inputChatTitleControl : AbstractControl ;
  let inputChatDateControl  : AbstractControl ;
  let inputChatFileControl  : AbstractControl ;

  let inputEvent: Event ;
  let chatTitleStub: string ;
  let chatDateStub:  string ;
  let chatFileStub : File;

  let whtsAppChatServiceMock : jasmine.SpyObj<WhtsappchatService> ;
  let matSnackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async(() => {
    whtsAppChatServiceMock = jasmine.createSpyObj<WhtsappchatService>('WhtsappchatService', ['addWhtsAppChat']);
    matSnackBarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar' , [ 'open']);
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ AddwhtsappchatComponent ],
      providers:[
        {provide: WhtsappchatService , useValue: whtsAppChatServiceMock},
        {provide: MatSnackBar , useValue: matSnackBarMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwhtsappchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputChatTitle  = el('[data-test="input-chat-title"]');
    inputChatDate = el('[data-test="input-chat-date"]');
    inputChatFile  = el('[data-test="input-chat-file"]');
    btnSubmit = el('[data-test="btn-submit"]');

    inputChatTitleControl = component.whtsappChatForm.controls['chatTitle'];
    inputChatDateControl  = component.whtsappChatForm.controls['chatDate'];
    inputChatFileControl  = component.whtsappChatForm.controls['chatFile'];

    inputEvent = new Event('input');
    chatTitleStub = 'test title' ;
    chatDateStub = moment(moment.now()).format('YYYY-MM-DD');
    chatFileStub = new File(['test file '] , 'test.txt');
  });

  function el(selector: string){
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

  describe('Component Initailization ' , () => {


    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render  the add whts app chat form ' , () => {

      expect(inputChatTitle).toBeTruthy();
      expect(inputChatDate).toBeTruthy();
      expect(inputChatFile).toBeTruthy();
      expect(btnSubmit).toBeTruthy();

      expect(inputChatTitle.type).toEqual('text');
      expect(inputChatDate.type) .toEqual('date');
      expect(inputChatFile.type) .toEqual('file');
      expect(btnSubmit.type). toEqual('submit');

    });

  });

  describe('Component Funtionality ' , () =>{

    it('should call the whasappchat service add whtsapp chat method when on submit is executed  ' , () => {

      let result: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'Chat is Added '};

      let addWhtsAppChatSpy  = whtsAppChatServiceMock.addWhtsAppChat.and.returnValue(of(result));

      component.onSubmit();

      expect(addWhtsAppChatSpy).toHaveBeenCalledTimes(1);

    });

    it('should call the Add whtsapp chat method with parameter ' , () => {
      inputChatTitle.value = chatTitleStub ;
      inputChatDate.value  = chatDateStub;

      inputChatTitle.dispatchEvent(inputEvent);
      inputChatDate.dispatchEvent(inputEvent);

      component.chatFile = chatFileStub;

      fixture.detectChanges();

      let whtsAppChatFormStub:  WhtsAppChatForm
      = {chatTitle: chatTitleStub , chatDate : moment(chatDateStub ,'YYYY-MM-DD').valueOf(),chatFile: chatFileStub};


      let result: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'Chat is Added '};

      let addWhtsAppChatSpy  = whtsAppChatServiceMock.addWhtsAppChat.and.returnValue(of(result));

      component.onSubmit();

      expect(addWhtsAppChatSpy).toHaveBeenCalledWith(whtsAppChatFormStub);



    });

    it('should call the snackbar to show the Success notification ' , () => {
      let result: Notification = {successStatus: true , errorStatus: false , notificationMsg: 'Chat is Added '};

      let addWhtsAppChatSpy  = whtsAppChatServiceMock.addWhtsAppChat.and.returnValue(of(result));

      component.onSubmit();

      let snackbarOpenSpy = matSnackBarMock.open;

      expect(snackbarOpenSpy).toHaveBeenCalledTimes(1);

      expect(snackbarOpenSpy).toHaveBeenCalledWith(result.notificationMsg ,  'Success');
    });


    it('should call the snackbar to show the Error notification ' , () => {
      let result: Notification = {successStatus: false , errorStatus: true , notificationMsg: 'Something Went Wrong '};

      let addWhtsAppChatSpy  = whtsAppChatServiceMock.addWhtsAppChat.and.returnValue(of(result));

      component.onSubmit();

      let snackbarOpenSpy = matSnackBarMock.open;

      expect(snackbarOpenSpy).toHaveBeenCalledTimes(1);

      expect(snackbarOpenSpy).toHaveBeenCalledWith(result.notificationMsg ,  'Error');

    });


  });


  describe('Chat Title Validation ' , () => {

    it('should have value entered by the user in the controller ' , () =>{
      inputChatTitle.value = chatTitleStub ;
      inputChatTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatTitleControl.value).toEqual(chatTitleStub);
    });

    it('chat title input should not be empty and submit button should be inactive ' , () => {

      inputChatTitle.value = '';
      inputChatTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatTitleControl.valid).toBe(false);
      expect(btnSubmit.disabled).toBe(true);

     });

    it('chat title should not be just empty spaces and submit button should be inactive' , () => {

      inputChatTitle.value = '    ';
      inputChatTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatTitleControl.valid).toBe(false);
      expect(btnSubmit.disabled).toBe(true);


     });


    it('chat title should be valid on correct input ' , () => {
      inputChatTitle.value = chatTitleStub;
      inputChatTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatTitleControl.valid).toBe(true);
     });

  });

  describe('Chat Date Validations ' , () =>{

    it('should have value of the chat date input in the control ' , () =>{

      inputChatDate.value = chatDateStub ;
      inputChatDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatDateControl.value).toEqual(chatDateStub);
    });

    it('chat date should be entered and submit button should be inactive' , () => {

      inputChatDate.value = '' ;
      inputChatDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatDateControl.valid).toBe(false);
      expect(btnSubmit.disabled).toBe(true);


    });

    it('chat date should be in correct format and submit button should be inactive when format is wrong  ' , () => {

      inputChatDate.value = '02-02-2020' ;
      inputChatDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatDateControl.valid).toBe(false);
      expect(btnSubmit.disabled).toBe(true);


    });


    it('chat date should valid when date is in correct format  ' , () => {

      inputChatDate.value = chatDateStub ;
      inputChatDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(inputChatDateControl.valid).toBe(true);

    });


  });

  describe('Chat File Validations ' , () => {

    /** This code don't test the file extension behaviour because we can not mock the file selecting
     *  behaviour of the user because we can not change the value of input field in html input with
     *  type as file in future complete this code with proper method to test the file extension
     */

    let changeEvent: Event;

    beforeEach(() => {

      changeEvent = new Event('change');

    });

    it('should call the updateFile method when file is selceted  ' , () => {

      let updateFileSpy = spyOn(component , 'updateFile');

      inputChatFile.dispatchEvent(changeEvent);

      fixture.detectChanges();

      expect(updateFileSpy).toHaveBeenCalledTimes(1);

    });

    it('updateFile method should get the file name in component chatFile'  , () => {

      component.updateFile( new FileListStub([chatFileStub]));

      fixture.detectChanges();

      expect(component.chatFile).toEqual(chatFileStub);

    });

    it('should validate that user have selected the file and submit button should be inactive' , () => {

      // because this input accept file path as value it can only be empty string

      inputChatFileControl.setValue('');
      fixture.detectChanges();

      expect(inputChatFileControl.valid).toBe(false);
      expect(btnSubmit.disabled).toBe(true);

    });


  });

  describe('Submit Button Validation ' , () => {


    it('submit button should be active when input are correct ' , () => {
      inputChatTitle.value = chatTitleStub;
      inputChatDate.value  = chatDateStub;

      inputChatTitle.dispatchEvent(inputEvent);
      inputChatDate.dispatchEvent(inputEvent);

      /** we remove all the validation from the inputchatfilecontrol sinse we can not mock the
       *  user behaviour of selecting the file with correct format .
       */
      inputChatFileControl.clearAsyncValidators();
      inputChatFileControl.clearValidators();
      inputChatFileControl.updateValueAndValidity();

      fixture.detectChanges();

      expect (btnSubmit.disabled).toBe(false);

    });

    it('when submit button is clicked it should execute the onSubmit method ' , () => {

      let onSubmitSpy = spyOn(component , 'onSubmit');

      inputChatTitle.value = chatTitleStub;
      inputChatDate.value  = chatDateStub;

      inputChatTitle.dispatchEvent(inputEvent);
      inputChatDate.dispatchEvent(inputEvent);

      /** we remove all the validation from the inputchatfilecontrol sinse we can not mock the
       *  user behaviour of selecting the file with correct format .
       */
      inputChatFileControl.clearAsyncValidators();
      inputChatFileControl.clearValidators();
      inputChatFileControl.updateValueAndValidity();

      fixture.detectChanges();

      btnSubmit.click();

      fixture.detectChanges();

      expect(onSubmitSpy).toHaveBeenCalledTimes(1);

    });




  });




});
