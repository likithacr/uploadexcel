import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router,private userService: UserService, private authservice: AuthService) {}

  email = new FormControl('', [Validators.required,Validators.pattern('[A-Za-z0-9_.]+@veolia.com'),]);
  password = new FormControl('', [Validators.required]);



  registered = localStorage.getItem('registrationotp');

  //isDisabled = true;
  hide = true;
 // color = '#58B7F4';
  errormessage!: string;
  reg= '[a-z0-9]+@veolia.com';
  invalidcred=false;
  showPassword = true;
  

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



  
  // getBackgroundColor() {
  //   if (this.email.value?.match(this.reg) && this.password.value !== '') {
  //     this.color = '#58B7F4';
  //     this.isDisabled = false;
  //   } else {
  //     this.color = '#c3c3c3';
  //     this.isDisabled = true;
  //   }
  //   return this.color;
  // }



  validate() {
    console.log("Validatefunction");
    let loginpayload = {
      action:"login",
      password:this.password.value,
      email:this.email.value,
    }
    this.userService.loginUser(loginpayload).subscribe((data) => {
      console.log(data);
      if (data['Code']=="Success") 
      { 
        this.authservice.isAuthenticated=true;
        this.userService.usermail=this.email.value;
        console.log(this.authservice.isAuthenticated);
        this.router.navigate(['home']);
      }
      else {
        this.invalidcred = true;
        this.errormessage = data['Message'];
        console.log(data['Message'])
      }
    })
    
  }
  invalidcreds(){
    this.invalidcred = false
  }
}