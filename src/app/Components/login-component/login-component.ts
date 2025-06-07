import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonServices } from '../../Services/common-services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  constructor(
    private commonServices: CommonServices,
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  login(){
    if(this.loginForm.valid){
      this.commonServices.loginUser(this.loginForm.value);
      this.commonServices.isLoggedUserSubject.next(true);
      this.loginForm.reset();
    }else{
      console.error('Form is invalid');
    }
  }
}
