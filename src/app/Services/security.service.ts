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

  // AddUsers(User: any) {
  //   return this.Http.post('https://localhost:44319/api/ExpenseTracker/CreateUser', User);
  // }
  AddUser(userForm:any){
    return this.Http.post('https://localhost:44319/api/ExpenseTracker/CreateUser',userForm);
  }

  UpdateUser(userForm:any){
    return this.Http.put('https://localhost:44319/api/ExpenseTracker/CreateUser',userForm);
  }
  GetRoles(){
    return this.Http.get('https://localhost:44319/Help/Api/GET-GetRoles');
  }

  GetExpensesData(){
    return this.Http.get('https://localhost:44319/api/expenses/GetAllExpenses()');
  }

  GetDepositData(){
    return this.Http.get('https://localhost:44319/api/expenses/GetAllDeposits()');
  }
}
