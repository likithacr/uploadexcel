import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CognitoAuth,
  CognitoIdToken,
  CognitoAccessToken,
} from "amazon-cognito-auth-js";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'upexcel';
  auth: BehaviorSubject<any>;
  private url: string = "";

  constructor(){
    //this.currentUser = this.currentUserSubject.asObservable();
    this.auth = new BehaviorSubject<any>(null);
  }

  getUserDataFromToken(id_token: string, access_token: string) {
    let tokenData : { [key: string]: any } = {};

    if (id_token.length > 0) {
     
      tokenData["orignalToken"] = id_token;
      tokenData["parsedTokenData"] = new CognitoIdToken(id_token);
    } else if (access_token.length > 0) {
      tokenData["orignalToken"] = access_token;
      tokenData["parsedTokenData"] = new CognitoAccessToken(access_token);
    }
    console.log("tokenData===>", tokenData);
    return tokenData;
  }

  initCognitoSDK() {
    let self = this;
    environment['authData']["LaunchUri"] = () => {
      window.open(
        `https://${environment['authData']["AppWebDomain"]}/as/authorization.oauth2?redirect_uri=${environment['authData']["RedirectUriSignIn"]}&response_type=token&client_id=${environment['authData']["ClientId"]}&scope=openid`,
        "_self"
      );
    };
    let auth = new CognitoAuth(environment['authData']);
    //sessionStorage.setItem('path',window.location.href+"/home")
    auth.userhandler = {
      onSuccess: function (result: any) {
        console.log("Cognito Sign in successful!");
        window.location.href = window.location.origin+"/home"
        console.log(window.location.href)
        //self.initializeSessionTimer();
       // let user = new User();
        let id_token = auth.getSignInUserSession()//.idToken.jwtToken;
        let access_token = auth.getSignInUserSession()//.accessToken.jwtToken;
       // let tokenData = self.getUserDataFromToken(id_token, access_token);
       // localStorage.setItem("accessToken", access_token);

        if (sessionStorage.getItem("curUrl")) {
          let curUrl = sessionStorage.getItem("curUrl");
          sessionStorage.removeItem("curUrl");
          if (window.location.href != curUrl) window.location.href = curUrl!;
        }

        //if (self.url) {
        //   user.url = self.url;
        //   // self.url = window.location.href = '';
        //   localStorage.setItem("authUrl", self.url);
        // } else if (localStorage.getItem("authUrl")) {
        //   user.url = localStorage.getItem("authUrl") || "";
        // } else {
        //   // user.url = `id_token=${id_token}`;
        //   user.url = `id_token=${tokenData["orignalToken"]}`;
        // }
        // user.token = tokenData["orignalToken"];
        // user.username = tokenData["parsedTokenData"]["payload"]["email"];

        // var newSSO = user.username; // auth.username.replace("Employee_", "");
        // // var namesFL = newSSO.split(".");
        // user.ssoId = newSSO;
        // user.firstName = tokenData["parsedTokenData"]["payload"]["given_name"]; //namesFL[0];
        // user.lastName = tokenData["parsedTokenData"]["payload"]["family_name"]; //namesFL[1];
        // console.log("user===>", user);
        // localStorage.setItem("currentUserEmail", user.ssoId);
        // localStorage.setItem("currentUser", JSON.stringify(user));
        // localStorage.getItem("currentUser");
        // // console.log(localStorage.getItem('currentUser'));
        // self.currentUserSubject.next(user);
        // self.router.navigate([self.route.snapshot.queryParams['returnUrl'] || '/home']);
      },
      onFailure: function (err: string) {
        console.log("Error!" + err);
        //clearInterval(self.timer);
        alert("Token Expired or Invalid! Signing Out...");
        auth.signOut();
      },
    };
    auth.getSession();
    return auth;
  }
  
}
