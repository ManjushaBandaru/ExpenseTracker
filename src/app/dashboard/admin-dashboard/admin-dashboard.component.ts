import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { ToastrService } from 'ngx-toastr';


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
    yearlyBudget: any;
    highestExpenditure: any;
    monthlyExpenditure: any;
    yearlyExpenditure: any;
    monthlyExpenses: any;
    Year: any;
    Month: any;
    ApprovalData: any[] = [];
    PendingApprovalData: any[] = [];
    basicOptions: any;
    selectedCategory: any = null;
    date1: Date = new Date();
    year: number = new Date().getFullYear();
    month: number = new Date().getMonth() + 1;
    selectedMonth: Date = new Date(this.year, this.month - 1, 1);
    creditDebitData: any = [];
    creditDebitTimeframe: string | undefined;
    categoryTimeframe: string | undefined;
    creditDebitDate: Date | undefined;
    categoryDate: Date | undefined;
    creditDebitOptions: any;
    categoryData: any;
    categoryOptions: any;
    cdData: any;
    cdOptions: any;
    totalApprovedApprovals: number = 0;
    totalPendingApprovals: number = 0;
    currentDate: any;
    currentYear: any;
    currentMonth: any;
    notifications: any[] = [];
    visible: boolean = false;
    pendingVisible: boolean = false;
    categoryGraphData: any;
    selectedDate: any;
    days: any[] = [];
    maxDate: Date = new Date(); 

    constructor(private route: Router, private adminservice: AdminService , private toastr: ToastrService) {
        this.maxDate.setHours(0, 0, 0, 0); // Set time to beginning of the day
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth() + 1;
    }
    ngOnInit() {
        this.categoryTimeframe = 'date';
        this.creditDebitTimeframe = 'month';
        this.GetCategorygraphBasedonDatemonthandyear();
        this.GetApprovedandPendingStatus();
        this.GetBudgetNotification();
        const year = 2024;
        const month = 'null';
        this.GetYearBudget();
        this.ApprovalListData();
        this.GetCreditDebitGraphBasedOnMonthYear();
        this.getHighestpurchaseCategory();
        this.GetMonthlyBudgetBasedOnCarryForwardAmount();
    }

    GetCategorygraphBasedonDatemonthandyear() {
        this.categoryGraphData = [];
        const year = this.date1.getFullYear();
        const month = new Date(this.selectedMonth).getMonth() + 1;  // getMonth() returns 0-11, so add 1
        const day = this.date1.getDate();
        console.log(day);
        if (this.categoryTimeframe === 'date') {
            this.adminservice.GetCategoriegraphBasedOnDateMonthYear(year, month, day).subscribe((data: any) => {
                this.categoryGraphData = data;
                console.log(this.categoryGraphData);
                this.IntitCategoryGraph();
            })
        }
        else if (this.categoryTimeframe === 'month') {
            this.adminservice.GetCategoriegraphBasedOnDateMonthYear(year, month, null).subscribe((data: any) => {
                this.categoryGraphData = data;
                console.log(this.categoryGraphData, 'categoryGraphData');
                this.IntitCategoryGraph();

            })
        }
        else if (this.categoryTimeframe === 'year') {
            this.adminservice.GetCategoriegraphBasedOnDateMonthYear(year, null, null).subscribe((data: any) => {
                this.categoryGraphData = data;
                console.log(this.categoryGraphData, 'categoryGraphData');
                this.IntitCategoryGraph();

            })
        }
    }

    IntitCategoryGraph() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const labels = this.categoryGraphData.map((each: { CategoryName: string; }) => each.CategoryName);
        const data = this.categoryGraphData.map((each: { TotalAmount: number; }) => each.TotalAmount);

        console.log(labels);
        console.log(data);

        this.categoryData = {
            labels: labels,
            datasets: [
                {
                    label: '',
                    data: data,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1,
                    barThickness: 30
                }
            ]
        };

        this.categoryOptions = {
            animation: {
                duration: 500
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        display: true,
                        generateLabels: function () {
                            hidden: true
                        },
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
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: 'transparent',
                        drawBorder: false
                    }
                }
            }
        };
    }

    GetCreditDebitGraphBasedOnMonthYear() {
        this.creditDebitData = [];
        // const year = this.date1.getFullYear();
        // console.log(year);
        // const month = this.date1.getMonth() + 1;
        // console.log(month);
        const day = this.date1.getDate();
        console.log(day);

        this.creditDebitData = [];
        const year = this.selectedMonth.getFullYear(); // Use selectedMonth
        console.log(year);
        const month = this.selectedMonth.getMonth() + 1; // Use selectedMonth
        console.log(month);

        if (this.creditDebitTimeframe === 'month') {
            this.adminservice.getCreditDebitGraphbasedonMonthYear(year, month).subscribe((data: any) => {
                this.creditDebitData = data;
                console.log(this.creditDebitData);
                this.IntitcreditdebitGraph();
            })
        }
        else if (this.creditDebitTimeframe === 'year') {
            this.adminservice.getCreditDebitGraphbasedonMonthYear(year, null).subscribe((data: any) => {
                this.creditDebitData = data
                console.log(this.creditDebitData);
                this.IntitcreditdebitGraph();
            })
        }
    }

    IntitcreditdebitGraph() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const creditAmount = this.creditDebitData.map((each: { TotalDeposits: number; }) => each.TotalDeposits);
        const debitAmount = this.creditDebitData.map((each: { TotalExpenses: number; }) => each.TotalExpenses);

        console.log(creditAmount);
        console.log(debitAmount);

        this.cdData = {
            labels: ['Credit', 'Debit'],
            datasets: [
                {
                    label: '',
                    data: [creditAmount, debitAmount],  // Add zero for the debit position
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1,
                    barThickness: 30
                }
            ]
        };

        this.cdOptions = {
            animation: {
                duration: 500
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        display: true,
                        generateLabels: function () {
                            hidden: true
                        },
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
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: 'transparent',
                        drawBorder: false
                    }
                }
            }
        };
    }


    formatDate(date: Date): string {
        const day = this.padZero(date.getDate());
        const month = this.padZero(date.getMonth() + 1);  // getMonth() returns 0-11, so add 1
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    padZero(value: number): string {
        return value < 10 ? '0' + value : value.toString();
    }
    formatMonthName(month: number): string {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1]; // Adjust for 0-based index of getMonth()
      }

    gotoPreviousDate() {
        this.date1.setDate(this.date1.getDate() - 1);
        this.date1.setHours(0, 0, 0, 0);
        this.handleDateChange();
    }

    gotoNextDate() {
    const currentDate = new Date();
    if (this.date1.getTime() >= currentDate.getTime()) {
      this.toastr.warning('Cannot select future dates.');
      return;
    }
    // Logic to navigate to the next date
    this.date1.setDate(this.date1.getDate() + 1);
  }

    onDaySelect(event: any) {
        this.date1 = event;
        this.date1.setHours(0, 0, 0, 0);
        this.handleDateChange();
    }

    handleDateChange() {
        console.log('Date changed:', this.date1);
        this.GetCategorygraphBasedonDatemonthandyear();
    }

    gotoPreviousMonth() {
        if (this.month > 1) {
            this.month--;
        } else {
            this.month = 12;
            this.year--;
        }
        this.selectedMonth = new Date(this.year, this.month - 1, 1);
        this.selectedMonth.setHours(0, 0, 0, 0);
        this.GetCategorygraphBasedonDatemonthandyear();
    }

    gotoNextMonth() {
        const currentDate = new Date();
        const nextMonth = new Date(this.year, this.month, 1); // Set to the beginning of the next month
    
        if (nextMonth > currentDate) {
            this.toastr.warning('Cannot select future months.');
            return;
        }
    
        if (this.month < 12) {
            this.month++;
        } else {
            this.month = 1;
            this.year++;
        }
        this.selectedMonth = new Date(this.year, this.month - 1, 1);
        this.selectedMonth.setHours(0, 0, 0, 0);
        this.GetCategorygraphBasedonDatemonthandyear();
    }
    

    onMonthSelect(event: any) {
        this.selectedMonth = event;
        this.month = this.selectedMonth.getMonth() + 1;
        this.year = this.selectedMonth.getFullYear();
    }

    gotoPreviousYear() {
        // Decrease the current year by 1
        this.year--;
    
        // Optionally, update any other relevant variables or states in your component
        // Example: Update selectedMonth if needed
        this.selectedMonth = new Date(this.year, this.month - 1, 1);
        this.selectedMonth.setHours(0, 0, 0, 0);
    
        // Call a method that depends on the year change, if any
        // Example: Update graph or data based on the new year
        this.GetCategorygraphBasedonDatemonthandyear();
    }

    gotoNextYear() {

    }

    GotolastMonth() {
        debugger;
        if (this.month > 1) {
            this.month--;
        } else {
            this.month = 12;
            this.year--;
        }
        this.selectedMonth = new Date(this.year, this.month - 1, 1);
        this.selectedMonth.setHours(0, 0, 0, 0);
        this.GetCreditDebitGraphBasedOnMonthYear();
    }

    GotoNextMonth() {
        const currentDate = new Date();
        const nextMonth = new Date(this.year, this.month, 1);
    
        if (nextMonth.getTime() > currentDate.getTime()) {
            this.toastr.warning('Cannot select future months.');
            return;
        }
    
        if (this.month < 12) {
            this.month++;
        } else {
            this.month = 1;
            this.year++;
        }
    
        this.selectedMonth = new Date(this.year, this.month - 1, 1);
        this.selectedMonth.setHours(0, 0, 0, 0);
        this.GetCreditDebitGraphBasedOnMonthYear();
    }

    GoToPreviousYear(){

    }

    GoToNextYear(){
        
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

    viewpendingDetails() {
        this.adminservice.GetApprovalsandPendingApprovals(this.currentYear, this.currentMonth)
            .subscribe((data: any) => {
                this.PendingApprovalData = data.filter((d: { StatusName: string }) => d.StatusName === 'Pending');
                this.pendingVisible = true;
            });
    }

    GetBudgetNotification() {
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

    GetYearBudget() {
        this.adminservice.GetyearlyBudget(this.currentYear, null).subscribe(
            (data: any[]) => {
                this.yearlyBudget = data;
                console.log(this.yearlyBudget);
            },
            (error: any) => {
                console.error('Error fetching yearly budget', error);
            }
        );
    }

    viewapprovalDetails() {
        this.visible = true;
    }

    ViewpendingDetails() {
        this.pendingVisible = true;
    }


    getHighestpurchaseCategory() {
        this.adminservice.getHighestCategoryPurchase().subscribe(
            (data: any[]) => {
                console.log('Received data:', data);
                this.highestExpenditure = data;

                if (data.length > 0) {
                    this.monthlyExpenditure = data[0];
                    this.yearlyExpenditure = data[1];
                }

                console.log('Monthly Expenditure:', this.monthlyExpenditure);
                console.log('Yearly Expenditure:', this.yearlyExpenditure);
            },
            error => {
                console.error('Error fetching highest expenditure data:', error);
            }
        );
    }

    GetMonthlyBudgetBasedOnCarryForwardAmount() {
        this.adminservice.getmonthlyBudgetReport(this.year, this.month).subscribe(
            (data: any) => {
                console.log(data);  // Log the fetched data
                this.monthlyExpenses = data;
            },
            (error: any) => {
                console.error('Error fetching monthly budget report:', error);
            }
        );
    }

}
