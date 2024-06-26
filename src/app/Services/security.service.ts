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
    return this.Http.get('https://localhost:44319/GetAllRolesSP')
  }
  Deleteuser(id:any){
    return this.Http.delete('https://localhost:44319/api/ExpenseTracker/Deleteuser?id='+id);
  }
  GetDropdownRoles(){
    return this.Http.get('https://localhost:44319/DropdownRoles')
    // return this.Http.get('https://localhost:44319/Help/Api/GET-GetRoles');
  }

  GetExpensesData(){
    return this.Http.get('https://localhost:44319/api/expenses/GetAllExpenses');
  }

  AddExpensesData(body:any){
    return this.Http.post('https://localhost:44319/api/expenses/AddupdateExpenses', body);
  }

  UpdateExpensesData(body:any){
    return this.Http.put('https://localhost:44319/api/expenses/updateExpenses', body);
  }

  GetExpensesDropdowns(data:any){
    return this.Http.get('https://localhost:44319/api/expenses/GetLookUpDropdown?name='+ data);
  }

  GetDepositData(){
    return this.Http.get('https://localhost:44319/api/expenses/GetDeposits()');
  }

  GetLookupsData(IsActive:any){
    return this.Http.get('https://localhost:44319/api/expenses/GetLookUpDetails?pIsActive='+ IsActive);
  }

  Addlookups(body:any){
    return this.Http.post('https://localhost:44319/api/expenses/CreateLookUP', body);
  }

  AddExpenses(ExpenseForm:any){
    return this.Http.post('https://localhost:44319/api/expenses/AddupdateExpenses',ExpenseForm);
  }
  AddDeposits(depositForm:any){
    return this.Http.post('https://localhost:44319/api/expenses/AddupdateDeposite',depositForm)
  }
  UpdateDeposit(depositForm:any){
    return this.Http.put('https://localhost:44319/api/expenses/UpdateDeposite',depositForm)
  }
  // Getdepositpaymentmethod(){
  //   return this.Http.get('https://localhost:44319/api/expenses/GetLookUpDropdown?name=${name}')
  // }
}
