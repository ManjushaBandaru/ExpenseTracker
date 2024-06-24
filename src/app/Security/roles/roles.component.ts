import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'jspdf-autotable';

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
  availableColumns: any[] | undefined;
  selectedColumns: any[] | undefined;
  globalFilterValue: string = '';


  // headers: any[] = [
  //   { header: 'Name', label: 'Name' },
  //   { header: 'employeerole', label: 'Employee Role' },
  //   { header: 'Isactive', label: 'Is Active' },
  //   { header: 'CreatedDate', label: 'Created Date' },
  //   { header: 'CreatedBy', label: 'Created By' },
  //   { header: 'UpdatedDate', label: 'Updated Date' },
  //   { header: 'UpdatedBy', label: 'Updated By' }
  // ];

  permission: any = { CanManageRoles: true };

  constructor(private fb: FormBuilder, private router: Router) {
  
  }

  ngOnInit() {
  
    this.RoleForm();
    this.availableColumns = [
      { field: 'CreatedAt', header: 'Created At' },
      { field: 'UpdatedAt', header: 'Updated At' },
      { field: 'CreatedByName', header: 'Created By Name' },
      { field: 'UpdatedByName', header: 'Updated By Name' }
    ];

    this.selectedColumns = this.availableColumns;

  }
  isColumnSelected(field: string): boolean {
    return this.selectedColumns?.some(col => col.field === field) ?? false;
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

  onAdd() {
    this.showform = true;
  }

  // clear() {
  //   // Example usage of myTab if needed
  //   if (this.myTab) {
  //     this.myTab.clear(); // Example method call on myTab
  //   }
  // }
  clear(table: any) {
    table.clear();
  }
  onDelete() {
  }

  submit() {
  }

  closeForm() {
    this.showform = false;
  }

  onEdit(){}
}
