import { MatToolbarModule } from '@angular/material/toolbar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    htmlElement = fixture.nativeElement ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the navbar',() => {
    expect(htmlElement.querySelector('[data-test="navbar"]')).toBeTruthy();
  });

  it('should have logo in the navbar' , () =>{

    expect(htmlElement.querySelector('[data-test="logo"]')).toBeTruthy();
  });

  it('should have the singIn and Signup link in the nevbar' , () => {

    expect(htmlElement.querySelectorAll('[data-test="navbar-links"] a').length).toBe(2);
    expect(htmlElement.querySelectorAll('[data-test="navbar-links"] a').item(0).textContent).toEqual("LogIn");
    expect(htmlElement.querySelectorAll('[data-test="navbar-links"] a').item(1).textContent).toEqual("SignUp");



  });


});
