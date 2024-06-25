import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  GetApprovalsandPendingApprovals(year: any, month: any){
    return this.http.get(`https://localhost:44319/api/expenses/GetTotalExpensesByCategoryAndStatus?year=${year}&month=${month}`)
  }


  GetMonthlyBudgetNotifications() {
    return this.http.get<any[]>('https://localhost:44319/api/expenses/GetMonthlyBudgetNotification()');
  }

  GetyearlyBudget(year: any , month : any): Observable<any>{
    return this.http.get<any> (`https://localhost:44319/api/expenses/GetBudgetReport?year=${year}&month=${month}`)
  }

  GetCategoriegraphBasedOnDateMonthYear(year : any , month : any , day : any){
    console.log(year);
    console.log(month);
    console.log(day);
    
    
    
    return this.http.get(`https://localhost:44319/api/expenses/GetTotalExpenses?year=${year}&month=${month}&day=${day}`)
  }

  getCreditDebitGraphbasedonMonthYear(year : any , month : any){
    return this.http.get(`https://localhost:44319/api/expenses/GetMonthlyReport?year=${year}&month=${month}`)
  }

}
