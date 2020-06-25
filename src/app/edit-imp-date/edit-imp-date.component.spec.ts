import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImpDateComponent } from './edit-imp-date.component';

fdescribe('EditImpDateComponent', () => {
  let component: EditImpDateComponent;
  let fixture: ComponentFixture<EditImpDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ EditImpDateComponent ],
      providers:[

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImpDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function el(selector: string){
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

  describe('Component Initalization' , () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the edit important date form ' , () => {

      let inputDate: HTMLInputElement = el('[data-test="input-date"]');
      let inputTitle: HTMLInputElement = el('[data-test="input-title"]');
      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      expect(inputDate).toBeTruthy();
      expect(inputTitle).toBeTruthy();
      expect(btnSubmit).toBeTruthy();

      expect(inputDate.type).toEqual('date');
      expect(inputTitle.type).toEqual('text');
      expect(btnSubmit.type).toEqual('submit');

    });

  });

  describe('Component Functionality' , () => {

    let inputDate: HTMLInputElement ;
    let inputTitle: HTMLInputElement ;
    let dateControl: AbstractControl ;
    let titleControl: AbstractControl;
    let inputEvent: Event ;
    let dateStubValue: string;
    let titleStubValue: string;

    beforeEach(() => {
      inputDate = el('[data-test="input-date"]');
      inputTitle = el('[data-test="input-title"]');
      dateControl = component.editFormGroup.controls['dateControl'];
      titleControl = component.editFormGroup.controls['titleControl'];
      inputEvent = new Event('input');
      dateStubValue = '2020-02-20';
      titleStubValue = 'test title';

    });

    it('should have the value in the form control ' , () => {

      // date is in mm-dd-yyyy format
      inputDate.value = dateStubValue ;
      inputTitle.value = titleStubValue ;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      expect(dateControl.value).toEqual(dateStubValue);
      expect(titleControl.value).toEqual(titleStubValue);

    });

    it('should check if the date is entered of not empty' , () => {
      inputDate.value = "";

      inputDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(dateControl.valid).toBe(false);
    });

    it('should check if the date is entered of not wrong format' , () => {
      inputDate.value = "02-20-2020";

      inputDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(dateControl.valid).toBe(false);
    });

    it('should check if the date is entered is correct' , () => {
      inputDate.value = dateStubValue;

      inputDate.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(dateControl.valid).toBe(true);
    });


    it('should check if the title field is not empty ' , () => {
      inputTitle.value = "";

      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(titleControl.valid).toBe(false);

    });

    it('should check if the title field is not empty space ' , () => {
      inputTitle.value = "   ";

      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(titleControl.valid).toBe(false);

    });

    it('should check if the title field is correct format ' , () => {
      inputTitle.value = titleStubValue;

      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      expect(titleControl.valid).toBe(true);

    });


    it('should check if submit button is disabled when form is not validated ' , () =>{

      inputDate.value = dateStubValue;

      inputTitle.value = '';

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      expect(btnSubmit.disabled).toBe(true);

    });


    it('should check if submit button is enabled when form is validated ' , () =>{

      inputDate.value = dateStubValue ;

      inputTitle.value = titleStubValue ;

      inputDate.dispatchEvent(inputEvent);
      inputTitle.dispatchEvent(inputEvent);

      fixture.detectChanges();

      let btnSubmit: HTMLButtonElement = el('[data-test="btn-submit"]');

      expect(btnSubmit.disabled).toBe(false);

    });



  });


});
