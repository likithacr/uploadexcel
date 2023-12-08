import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer ",
    }),
  };

  constructor( private httpclient: HttpClient ) {}

  registerUser(indata:Object): Observable<any> {
    return this.httpclient.post(
      "https://j37mc1ybai.execute-api.us-east-1.amazonaws.com/devstage/testpostapi", indata,
      this.httpOptions
    );
  }

  loginUser(indata:Object): Observable<any> {
    return this.httpclient.post(
      "https://j37mc1ybai.execute-api.us-east-1.amazonaws.com/devstage/testpostapi", indata,
      this.httpOptions
    );
  }

}
