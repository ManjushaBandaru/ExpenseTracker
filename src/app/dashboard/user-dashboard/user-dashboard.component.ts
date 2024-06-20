import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  pieData: any;
  pieOptions: any;


  ngOnInit() {
    this.initCharts();
}

initCharts() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
  this.pieData = {
    labels: ['Variable Expenses', 'Discretionary Expenses', 'Fixed Expenses'],
    datasets: [
        {
            data: [540, 325, 702],
            backgroundColor: [
                documentStyle.getPropertyValue('--blue-200'),       // For Variable Expenses
                documentStyle.getPropertyValue('--blue-300'),       // For Discretionary Expenses
                documentStyle.getPropertyValue('--blue-500')        // For Fixed Expenses
            ],
            hoverBackgroundColor: [
                documentStyle.getPropertyValue('--blue-100'),       // For Variable Expenses
                documentStyle.getPropertyValue('--blue-200'),       // For Discretionary Expenses
                documentStyle.getPropertyValue('--blue-500')        // For Fixed Expenses
            ]
        }]
};

  this.pieOptions = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor
              }
          }
      }
  };
}
}
