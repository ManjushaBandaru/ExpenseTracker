import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  basicData: any;

  basicOptions: any;


  ngOnInit() {
    this.initCharts();
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

  // initCharts() {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //   this.pieData = {
  //     labels: ['Variable Expenses', 'Discretionary Expenses', 'Fixed Expenses'],
  //     datasets: [
  //         {
  //             data: [540, 325, 702],
  //             backgroundColor: [
  //                 documentStyle.getPropertyValue('--blue-200'),       // For Variable Expenses
  //                 documentStyle.getPropertyValue('--blue-300'),       // For Discretionary Expenses
  //                 documentStyle.getPropertyValue('--blue-500')        // For Fixed Expenses
  //             ],
  //             hoverBackgroundColor: [
  //                 documentStyle.getPropertyValue('--blue-100'),       // For Variable Expenses
  //                 documentStyle.getPropertyValue('--blue-200'),       // For Discretionary Expenses
  //                 documentStyle.getPropertyValue('--blue-500')        // For Fixed Expenses
  //             ]
  //         }]
  // };

  //   this.pieOptions = {
  //       plugins: {
  //           legend: {
  //               labels: {
  //                   usePointStyle: true,
  //                   color: textColor
  //               }
  //           }
  //       }
  //   };
  // }
}
