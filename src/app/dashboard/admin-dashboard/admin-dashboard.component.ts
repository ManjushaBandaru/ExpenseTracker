import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  

  ngOnInit(): void {

  }

  constructor() { }

  admin = {
    name: 'John Doe',
    role: 'Administrator',
    gender:'male',
    email: 'john.doe@example.com',
    dateofbirth:'12 dec 1980',
    phonenumber: '123-456-7890',
  };
}
