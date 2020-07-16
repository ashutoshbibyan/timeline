import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AddImpDateComponent } from './add-imp-date/add-imp-date.component';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { AddtimelineComponent } from './addtimeline/addtimeline.component';
import { ShowtimelinesComponent } from './showtimelines/showtimelines.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EdittimelineComponent } from './edittimeline/edittimeline.component';
import { ShowimpdatesComponent } from './showimpdates/showimpdates.component';
import { EditImpDateComponent } from './edit-imp-date/edit-imp-date.component';
import { AddwhtsappchatComponent } from './addwhtsappchat/addwhtsappchat.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ShowwhtsappchatComponent } from './showwhtsappchat/showwhtsappchat.component'; // for the validation of the reactive forms


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AddImpDateComponent,
    UsersignupComponent,
    AddtimelineComponent,
    ShowtimelinesComponent,
    EdittimelineComponent,
    ShowimpdatesComponent,
    EditImpDateComponent,
    AddwhtsappchatComponent,
    ShowwhtsappchatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    RxReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
