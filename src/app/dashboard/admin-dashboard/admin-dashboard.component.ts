import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  barData: any;
  barOptions: any;
  visible: boolean = false;

  data: any;

  options: any;

  ngOnInit(): void {
      this.Barinit();
  };

  showDialog(){
    this.visible = true;
  };

  Barinit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
          datasets: [
              {
                  label: 'Month Wise Report',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [65, 59, 80, 81, 56, 55, 40, 55, 67, 71, 85, 75, 71]
              },
              // {
              //     label: 'My Second dataset',
              //     backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              //     borderColor: documentStyle.getPropertyValue('--pink-500'),
              //     data: [28, 48, 40, 19, 86, 27, 90]
              // }
          ]
      };

      this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                      }
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
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
      
  };

  constructor(private route: Router) { }

  admin = {
    name: 'John Doe',
    role: 'Administrator',
    gender:'male',
    email: 'john.doe@example.com',
    dateofbirth:'12 dec 1980',
    phonenumber: '123-456-7890',
  };

  OnClick(){
    this.route.navigate(['/sidenav/dashboard/totalexpensesinfo']);
  };

}
