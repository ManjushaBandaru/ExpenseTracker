import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}
