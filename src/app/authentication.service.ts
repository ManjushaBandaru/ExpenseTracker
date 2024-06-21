import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url1 = 'https://localhost:44319/loginToken'

  constructor(private Http: HttpClient) { }

  tokenlogin(loginData: string, options: {headers:HttpHeaders}){
    return this.Http.post(this.url1, loginData, options)
  }
}
