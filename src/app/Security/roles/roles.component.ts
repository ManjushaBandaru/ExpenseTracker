import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  
  registrationform: FormGroup;
  roles: any[] = [];
  displayDialog: boolean = false;

  headers: any[] = [
    { header: 'Name', label: 'Name' },
    { header: 'employeerole', label: 'Employee Role' },
    { header: 'Isactive', label: 'Is Active' },
    { header: 'CreatedDate', label: 'Created Date' },
    { header: 'CreatedBy', label: 'Created By' },
    { header: 'UpdatedDate', label: 'Updated Date' },
    { header: 'UpdatedBy', label: 'Updated By' }
  ];

  permission: any = { CanManageRoles: true };

  constructor(private fb: FormBuilder, private route: Router) {
    this.registrationform = this.fb.group({
      FirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      LastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@gmail.com')]]
    });
  }

  ngOnInit(): void {}

  initRole(role: any): void {}

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  onAdd() {}

  submit() {}
}
