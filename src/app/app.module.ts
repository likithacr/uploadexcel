import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './services/material.module';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

// export function init_app(dataapi: AppComponent) {
//   // console.log("init test")
//   return () => {
//     console.log("Check")
//     dataapi.initCognitoSDK();
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    DatePipe
    // AppComponent,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: init_app,
    //   deps: [AppComponent ],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
