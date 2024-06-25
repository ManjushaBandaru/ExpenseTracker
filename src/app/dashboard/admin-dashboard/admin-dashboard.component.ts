import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { AdminService } from 'src/app/Services/admin.service';

interface City {
    name: string;
    code: string;
}


@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    date: Date[] | undefined;
    basicData: any;
    cities: City[] | undefined;

    selectedCity: City | undefined;

    credit: number = 0; 
    debit: number = 0; 

    year: any;
    month: any;

    ApprovalData:any[]=[];

    
    basicOptions: any;

    selectedCategory: any = null;

    date1: Date | undefined;

    creditDebitTimeframe: string | undefined;
    categoryTimeframe: string | undefined;
    creditDebitDate: Date | undefined;
    categoryDate: Date | undefined;

    creditDebitData: any;
    creditDebitOptions: any;
    categoryData: any;
    categoryOptions: any;

    totalApprovedApprovals: number = 0;
    totalPendingApprovals: number = 0;
    currentDate: any;
    currentYear: any;
    currentMonth: any;
    notifications: any[]=[];
    visible: boolean = false;

    constructor(private route: Router, private adminservice: AdminService) {
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth() + 1;
    }
    ngOnInit() {
        this.GetApprovedandPendingStatus();
        this.GetBudgetNotification();
        this.Intitbar();
        const year = 2024; 
        const month = 'null'; 
        this.GetYearBudget(year, month);
        this.ApprovalListData();
    }

    Intitbar() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: ['Daily Report'],
            datasets: [
                {
                    label: '',
                    data: [540],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)'],
                    borderWidth: 1,
                    barThickness: 30
                }
            ]
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    offset: true,
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                    ticks: {
                        color: textColorSecondary,
                        padding: -5
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                        offset: true
                    }
                }
            }
        };
    }


    OnClick() {
        this.route.navigate(['/sidenav/dashboard/totalexpensesinfo']);
    };

    updateCreditDebitChart() {

    }

    updateCategoryChart() {

    }

    GetApprovedandPendingStatus() {
        this.adminservice.GetApprovalsandPendingApprovals(this.currentYear, this.currentMonth)
            .subscribe((data: any) => {
                console.log(data);

                const pendingApprovals = data.filter((d: { StatusName: string; }) => d.StatusName === 'Pending');
                this.totalPendingApprovals = pendingApprovals.length;
                console.log(this.totalPendingApprovals);

                const ApprovedApprovals = data.filter((d: { StatusName: string; }) => d.StatusName === 'Approved');
                this.totalApprovedApprovals = ApprovedApprovals.length;
                console.log(this.totalApprovedApprovals);
            });
    }

    ApprovalListData() {
        this.adminservice.GetApprovalsandPendingApprovals(this.currentYear, this.currentMonth)
          .subscribe((data: any) => {
            // Filter data to include only approved approvals
            this.ApprovalData = data.filter((d: { StatusName: string }) => d.StatusName === 'Approved');
            console.log(this.ApprovalData);
    
            const pendingApprovals = data.filter((d: { StatusName: string }) => d.StatusName === 'Pending');
            this.totalPendingApprovals = pendingApprovals.length;
            console.log(this.totalPendingApprovals);
    
            const ApprovedApprovals = data.filter((d: { StatusName: string }) => d.StatusName === 'Approved');
            this.totalApprovedApprovals = ApprovedApprovals.length;
            console.log(this.totalApprovedApprovals);
          });
      }

    GetBudgetNotification(){
        this.adminservice.GetMonthlyBudgetNotifications().subscribe(
            (data: any[]) => {
              console.log(data); 
              this.notifications = data; 
            },
            error => {
              console.error('Error fetching notifications:', error);
            }
          );
    }

    GetYearBudget(year: number, month: string){
        this.adminservice.GetyearlyBudget(this.currentYear,this.currentMonth).subscribe(
            (data: any) => {
              console.log(data); 
      
              const credits = data.filter((d: { type: string; }) => d.type === 'credit');
              this.credit = credits.reduce((sum: number, item: { amount: number; }) => sum + item.amount, 0);
              console.log('Total Credit:', this.credit);

              const debits = data.filter((d: { type: string; }) => d.type === 'debit');
              this.debit = debits.reduce((sum: number, item: { amount: number; }) => sum + item.amount, 0);
              console.log('Total Debit:', this.debit);
            }
          );
    }

    GetCategoryBasedonDatemonthandyear(){
        this.adminservice.GetCategoriesBasedOnDateMonthYear(this.date,this.month,this.year).subscribe((data:any)=>{
            this.GetCategoryBasedonDatemonthandyear = data
            console.log(data);
            
        })
    }

    viewapprovalDetails(){
        this.visible = true;
      }
}
