import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  registrationform!:FormGroup;
  roles: any[] = [];
  headers: any[] = [
    { header: 'Name', label: 'Name' },
    { header: 'employeerole', label: 'Employee Role' },
    { header: 'Isactive', label: 'Is Active' },
    { header: 'CreatedDate', label: 'Created Date' },
    { header: 'CReatedBy', label: 'Created By' },
    { header: 'UpdatedDate', label: 'Updated Date' },
    { header: 'UpdatedBy', label: 'Updated By' }
  ];
  dialog: boolean = false;
  permission: any = { CanManageRoles: true }; // Sample permission object

  constructor() { }

  ngOnInit(): void {
    // Initialize roles, headers, etc.
  }

 

  initRole(role: any): void {
    // Implement role initialization functionality
  }
  onAdd(){}
  submit(){}
}
