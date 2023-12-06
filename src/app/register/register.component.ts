import { Component, OnInit } from '@angular/core';
import { FormControl, Validators ,FormBuilder,FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor(public snackBar: MatSnackBar,private fb: FormBuilder ) {}


  password = new FormControl('', [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')]);
  name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  email = new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9_]+@veolia.com')]);
  confirmpassword = new FormControl('', [Validators.required]);
  errorMessage = '';

  getErrorMessage(){
    
    if(this.password.hasError('pattern')){
      this.errorMessage='Password must contain at least one number, one uppercase and lowercase letter, and minimum 8  characters';
    }
    else if(this.password.value!==this.confirmpassword.value){
      this.errorMessage='Passwords must match';
    }
    else{
      this.errorMessage='';
    }
    return this.errorMessage;
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Please enter the email';
    }
    return this.email.hasError('email') ? '' : 'Please enter email ending with @veolia.com';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return "Please enter the password";
    }
    return "";
  }

  getErrorMessageConfirmPassword() {
    if (this.confirmpassword.hasError('required')) {
      return "Please enter the password";
    }
    return "";
  }


  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return "Please enter the name";
    }
    return this.name.hasError('name') ? '' : 'Please enter a valid name ';
  }


  getBackgroundColor() {
    if (this.email.value === '' || this.password.value === '' || this.name.value === '' || this.confirmpassword.value === '') {
      this.color = '#c3c3c3';
      this.isDisabled = true;
    }
    else {
      this.color = '#58B7F4';
      this.isDisabled = false;
    }
    return this.color;
  }

  

  isDisabled = true;
  color = '#c3c3c3';
  showPassword = true;
  showConfirmPassword = true;
  registrationotp = false;

  
  openSnackBar(message: string, action: string) {
     this.snackBar.open(message, action, {
        duration: 3000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
        panelClass:['white-snackbar']
     })
  } 
  registerFn(){
   if(this.password.valid && this.confirmpassword.valid && this.email.valid && this.name.valid )
   {
    //this.password.value,this.confirmpassword.value,this.email.value,this.name.value
 
    // let payload={
    //   password:this.password.value,
    //   confirm_password:this.confirmpassword.value,
    //   email:this.email.value,
    //   name:this.name.value,
    // }

    }
    
   }
  
}

