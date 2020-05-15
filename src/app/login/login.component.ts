import { Router } from '@angular/router';
import { LogInService } from './../service/log-in.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { notEmpty } from '../custom_validators/not-empty-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private formbuilder: FormBuilder ,
     private logInService: LogInService ,
     private router: Router ) { }

  ngOnInit(): void {
    this.formLogin = this.formbuilder.group({

      userName: ['',[notEmpty()] ],

      password: ['' , [notEmpty()]]

      });

  }

  onSubmit(){

    const userName = this.formLogin.controls['userName'].value;
    const password = this.formLogin.controls['password'].value;

    let authenticated: boolean =  false ;

    this.logInService.authenticate(userName , password).subscribe((res)=>{

      authenticated = res.successStatus;
    });

    (authenticated) ? this.router.navigateByUrl('/user/home') : this.router.navigateByUrl('/error');
  }

}
