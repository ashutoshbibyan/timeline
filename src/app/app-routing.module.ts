import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UsersignupComponent} from "./usersignup/usersignup.component";
import {UserHomeComponent} from "./user-home/user-home.component";
import {AddImpDateComponent} from "./add-imp-date/add-imp-date.component";
import {AddtimelineComponent} from "./addtimeline/addtimeline.component";
import { EditImpDateComponent } from './edit-imp-date/edit-imp-date.component';
import { EdittimelineComponent } from './edittimeline/edittimeline.component';
import { ShowallchatsComponent } from './showallchats/showallchats.component';
import { ShowimpdatesComponent } from './showimpdates/showimpdates.component';
import { ShowtimelinesComponent } from './showtimelines/showtimelines.component';
import { ShowwhtsappchatComponent } from './showwhtsappchat/showwhtsappchat.component';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';



const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login" , component:LoginComponent},
  {path:"signup" ,component:UsersignupComponent},
  {path:"user/home" ,component:UserHomeComponent ,children:[
    {path:"add/impdate" , component:AddImpDateComponent},
    {path:"add/timeline" , component:AddtimelineComponent},
    {path:"edit/impdate" , component:EditImpDateComponent},
    {path:"edit/timeline" , component:EdittimelineComponent},
    {path:"show/chats" , component:ShowallchatsComponent} ,
    {path:"show/impdates" , component:ShowimpdatesComponent} ,
    {path:"show/timelines" , component:ShowtimelinesComponent},
    {path:"show/whtsappchat" , component:ShowwhtsappchatComponent},
    {path:"view/timeline" , component:TimelineViewComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
