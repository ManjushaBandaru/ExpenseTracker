import { Component, ViewChild } from '@angular/core';
import { Table } from 'jspdf-autotable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

 
  users:any[]=[];

  onAdd(){}
}
