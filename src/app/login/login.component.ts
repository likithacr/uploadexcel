import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) {}

  email = new FormControl('', [Validators.required,Validators.pattern('[A-Za-z0-9_]+@veolia.com'),]);
  password = new FormControl('', [Validators.required]);



  registered = localStorage.getItem('registrationotp');

  isDisabled = true;
  hide = true;
  color = '#c3c3c3';
  errormessage!: string;
  reg= '[a-z0-9]+@veolia.com';
  invalidcred=false;
  

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Please enter the email';
    }
    if (this.email.hasError('pattern')){
      
      return 'Please enter a valid email ending with @veolia.com';
    }
    return 'Please enter a valid email';
  }
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Please enter the password';
    }
    return 'Please enter the password';
  }



  
  getBackgroundColor() {
    if (this.email.value?.match(this.reg) && this.password.value !== '') {
      this.color = '#58B7F4';
      this.isDisabled = false;
    } else {
      this.color = '#c3c3c3';
      this.isDisabled = true;
    }
    return this.color;
  }


  validate() {
    if (
      this.email.value == 'admin@veolia.com' &&
      this.password.value == 'admin'
    ) { 
      this.invalidcred = false
      localStorage.setItem('visible', 'true');
      this.router.navigate(['home']);
    }
    else {
      this.invalidcred = true;
      this.errormessage = "Invalid credentials"
    }
  }
  invalidcreds(){
    this.invalidcred = false
  }
}