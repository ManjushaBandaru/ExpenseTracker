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


    year:any;
    month:any;


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

    totalApprovals: number = 0;
    totalPendingApprovals: number = 0;
    currentDate: any;
    currentYear: any;
    currentMonth: any;

    constructor(private route: Router ,private adminservice : AdminService) { 
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth() + 1;
    }
    ngOnInit() {
        this.GetApprovedandPendingStatus()
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

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

    updateCategoryChart(){

    }

    GetApprovedandPendingStatus(){
        this.adminservice.GetApprovalsandPendingApprovals(this.currentYear,this.currentMonth)
        .subscribe((data: any) => {
            console.log(data);
            
          this.totalApprovals = data.totalApprovals; // Replace with actual property from API response
          this.totalPendingApprovals = data.totalPendingApprovals; // Replace with actual property from API response
        });
    }
}
