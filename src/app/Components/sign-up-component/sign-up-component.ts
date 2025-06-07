import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServices } from '../../Services/common-services';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.scss'
})
export class SignUpComponent {

  constructor(
    private router: Router ,
    private commonServices: CommonServices
  ) { }

  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    profession: new FormControl('', [Validators.required]),
  })

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  signUp(){
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.router.navigate(['/login']);
      this.commonServices.addUser(userData).then(() => {
        console.log('User registered successfully');
        this.userForm.reset();
      }).catch(error => {
        console.error('Error registering user:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
