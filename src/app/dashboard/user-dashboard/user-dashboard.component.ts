import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  basicData: any;
  visible: boolean = false;
  basicOptions: any;
  ApprovalData: any[] = [];
  currentDate: any;
  currentYear: any;
  currentMonth: any;
  totalApprovedApprovals: number = 0;
  totalPendingApprovals: number = 0;

  constructor(private service: AdminService) {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1;
  }

  ngOnInit() {
    this.initCharts();
    this.ApprovalListData();
  }


  ApprovalListData() {
    this.service.GetApprovalsandPendingApprovals(this.currentYear, this.currentMonth)
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

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
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
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  viewDetails() {
    this.visible = true;
  }

  viewpendingDetails(){
    this.visible = true;
  }

  closeForm() {

  }

}
