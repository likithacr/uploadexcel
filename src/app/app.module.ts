import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

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
    MaterialModule
  ],
  providers: [
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
