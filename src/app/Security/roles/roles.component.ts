import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { SecurityService } from 'src/app/Services/security.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  rolesForm!: FormGroup;
  roles: any[] = [];
  showform: boolean = false;
 
  globalFilterValue: string = '';




  permission: any = { CanManageRoles: true };

  constructor(private fb: FormBuilder, private router: Router,private SecurityService: SecurityService) {
  
  }

  ngOnInit() {
  this.RoleData();
    this.RoleForm();
   

  }
 

  RoleForm() {
    this.rolesForm = this.fb.group({
      Name: ['', Validators.required],
      employeerole: ['', Validators.required],
      CreatedAt: [''],
      UpdatedAt: [''],
      IsActive: [false]
    });
  }
  RoleData(){
    
    this.SecurityService.GetRoles().subscribe((a: any) => {
      this.roles = a;
      console.log(a);
    })  }

  onAdd() {
    // this.showform = true;
  }

  // clear() {
  //   // Example usage of myTab if needed
  //   if (this.myTab) {
  //     this.myTab.clear(); // Example method call on myTab
  //   }
  // }
  clear(table: any) {
    table.clear();
    this.RoleData();
  }
  onDelete() {
  }

  submit() {
  }

  closeForm() {
    this.showform = false;
  }

  onEdit(){
    this.showform = true;
  }
}
