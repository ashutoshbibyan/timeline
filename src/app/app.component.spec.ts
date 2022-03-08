import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]

    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'timeline'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('timeline');
  });



  it('should have navbar component ', () => {
    expect(fixture.nativeElement.querySelector('[data-test="component-navbar"]')).toBeTruthy();
  });

  it('should have the login component in the center ' , () => {
    expect (fixture.nativeElement.querySelector('[data-test="component-login"]')).toBeTruthy();
  });


});
