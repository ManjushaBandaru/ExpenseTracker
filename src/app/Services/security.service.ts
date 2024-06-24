import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private Http: HttpClient) { }

  GetUsers(){
    return this.Http.get('https://localhost:44319/api/ExpenseTracker/GetUsers');
  }
}
