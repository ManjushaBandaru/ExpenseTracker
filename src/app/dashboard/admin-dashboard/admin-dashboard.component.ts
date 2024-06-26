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
    yearlyBudget: any;
    year: any;
    month: any;
    ApprovalData: any[] = [];
    PendingApprovalData: any[] = [];
    basicOptions: any;
    selectedCategory: any = null;

    date1: Date = new Date();

    currentYear: number = new Date().getFullYear();
    currentMonth: number = new Date().getMonth() + 1;
    creditDebitData: any = [];

    creditDebitTimeframe: string | undefined;
    categoryTimeframe: string | undefined;
    creditDebitDate: Date | undefined;
    categoryDate: Date | undefined;

    creditDebitOptions: any;
    categoryData: any;
    categoryOptions: any;

    totalApprovedApprovals: number = 0;
    totalPendingApprovals: number = 0;
    currentDate: any;
    // currentYear: any;
    // currentMonth: any;
    notifications: any[] = [];
    visible: boolean = false;
    pendingVisible: boolean = false;
    categoryGraphData: any;
    selectedDate: any;

    constructor(private route: Router, private adminservice: AdminService) {
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth() + 1;
    }
    ngOnInit() {
        this.categoryTimeframe = 'date';
        this.creditDebitTimeframe = 'date';
        this.GetCategorygraphBasedonDatemonthandyear();
        this.GetApprovedandPendingStatus();
        this.GetBudgetNotification();
        const year = 2024;
        const month = 'null';
        this.GetYearBudget();
        this.ApprovalListData();
        // this.viewpendingDetails();
        this.GetCreditDebitGraphBasedOnMonthYear();
    }

    GetCategorygraphBasedonDatemonthandyear() {
        this.categoryGraphData = [];
        const year = this.date1.getFullYear();
        const month = this.date1.getMonth() + 1;
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
                console.log(this.categoryGraphData);
                this.IntitCategoryGraph();
            })
        }
        else if (this.categoryTimeframe === 'year') {
            // this.adminservice.GetCategoriegraphBasedOnDateMonthYear(year, null, null).subscribe((data:any)=>{
            //     this.categoryGraphData = data
            //     console.log(this.categoryGraphData);
            // this.IntitCategoryGraph();
            // })
        }
    }

    IntitCategoryGraph() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        console.log(this.categoryGraphData);
        const totalAmount = this.categoryGraphData?.find((each: { TotalAmount: any; }) => each.TotalAmount);
        console.log(totalAmount);

        this.categoryData = {
            labels: ['Monthly Report'],
            datasets: [
                {
                    label: '',
                    data: [totalAmount?.TotalAmount],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)'],
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
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    GetCreditDebitGraphBasedOnMonthYear() {
        this.creditDebitData = [];
        const year = this.date1.getFullYear();
        const month = this.date1.getMonth() + 1;
        const day = this.date1.getDate();
        console.log(day);
        if (this.categoryTimeframe === 'date') {
            this.adminservice.getCreditDebitGraphbasedonMonthYear(year, month).subscribe((data: any) => {
                this.creditDebitData = data;
                console.log(this.creditDebitData);
                this.IntitcreditdebitGraph();
            })
        }
        else if (this.categoryTimeframe === 'month') {
            this.adminservice.getCreditDebitGraphbasedonMonthYear(year, month).subscribe((data: any) => {
                this.creditDebitData = data;
                console.log(this.creditDebitData);
                this.IntitcreditdebitGraph();
            })
        }
        else if (this.categoryTimeframe === 'year') {
            this.adminservice.getCreditDebitGraphbasedonMonthYear(year, null).subscribe((data:any)=>{
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
        console.log(this.creditDebitData);
        const totalAmount = this.creditDebitData?.find((each: { TotalAmount: any; }) => each.TotalAmount);
        console.log(totalAmount);

        this.categoryData = {
            labels: ['Monthly Report'],
            datasets: [
                {
                    label: '',
                    data: [totalAmount?.TotalAmount],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)'],
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
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
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

                // const credits = data.filter((d: { type: string }) => d.type === 'credit');
                // this.credit = credits.reduce((sum: number, item: { amount: number }) => sum + item.amount, 0);
                // console.log('Total Credit:', this.credit);

                // const debits = data.filter((d: { type: string }) => d.type === 'debit');
                // this.debit = debits.reduce((sum: number, item: { amount: number }) => sum + item.amount, 0);
                // console.log('Total Debit:', this.debit);
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
}
