import { UserService } from './../service/user.service';
import { Notification } from './../models/notification';
import { FormGroup , FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { notEmpty } from '../custom_validators/not-empty-validator';
import { UserSignUpModel } from '../form-data-models/user-signup-form-model';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {

  userSignupForm: FormGroup;

  constructor(private fb: FormBuilder , private userService: UserService) { }

  ngOnInit(): void {

    this.userSignupForm = this.fb.group({

      "userName": ["" , [notEmpty()] ],
      "password": ["" , [notEmpty()] ]

    });
  }

  onSubmit(){
    let user: UserSignUpModel  = {userName: this.userSignupForm.controls['userName'].value,
            password: this.userSignupForm.controls['password'].value};
    this.userService.signUp(user);
  }

}
