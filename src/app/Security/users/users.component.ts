import { Component, ViewChild, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { SecurityService } from 'src/app/Services/security.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userForm!: FormGroup;
  showform: boolean = false;
  users: any[] = [];
  Name: any[] = [];
  selectedColumns: any[] = [];
  availableColumns: any[] = [
    { field: 'CreatedByName', header: 'Created By' },
    { field: 'UpdatedByName', header: 'Updated By' },
    { field: 'CreatedAt', header: 'Created At' },
    { field: 'UpdatedAt', header: 'Updated At' }
  ]; 
  globalFilterValue: string = '';
  @ViewChild('myTab') myTab!: Table;
  currentUserName: string = 'CurrentUserName'; 

  constructor(private securityService: SecurityService, public fb: FormBuilder) {}

  ngOnInit() {
    this.UsersData();
    this.Getrolesdropdown();
    this.UsersForm();
    this.selectedColumns = this.availableColumns;
  }

  isColumnSelected(field: string): boolean {
    return this.selectedColumns?.some(col => col.field === field) ?? false;
  }

  UsersForm() {
    this.userForm = this.fb.group({
      Id: [''], 
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      EMail: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      IsActive: [true, Validators.required],
      CreatedByName: [''], 
      UpdatedByName: [''], 
      CreatedAt: [new Date()], 
      UpdatedAt: [new Date()], 
      UserRolesReq: this.fb.array([
        // RoleId: ['', Validators.required],
      ])
    });
  }

  UsersData() {
    this.securityService.GetUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }

  Getrolesdropdown() {
    this.securityService.GetDropdownRoles().subscribe((data: any) => {
      this.Name = data;
      console.log(data);
    });
  }

  closeForm() {
    this.showform = false;
  }

  Adduser() {
    if (this.userForm.invalid) {

      return;
    }

    this.userForm.patchValue({
      CreatedByName: this.currentUserName,
      UpdatedByName: this.currentUserName
    });

    this.securityService.AddUser(this.userForm.value).subscribe(
      () => {
        this.closeForm();
        this.UsersData(); 
        this.userForm.reset();
      },
      (error) => {
        console.error('Error while adding user:', error);
      }
    );
  }

  onAdd() {
    this.showform = true;
    this.userForm.reset();
  }

  clear(table: Table) {
    this.globalFilterValue = '';
    table.clear(); 
    this.UsersData(); 
  }

  onEdit(user: any): void {
    this.userForm.patchValue({
      Id: user.Id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      UserName: user.UserName,
      Password: user.Password,
      RoleId: user.RoleId,
      EMail: user.EMail,
      MobileNumber: user.MobileNumber,
      IsActive: user.IsActive,
      CreatedByName: user.CreatedByName,
      UpdatedByName: this.currentUserName,
      CreatedAt: new Date(user.CreatedAt), 
      UpdatedAt: new Date()
    });

   
    const rolesArray = this.userForm.get('UserRolesReq') as FormArray;
    rolesArray.clear();
    user.UserRoles.forEach((role: any) => {
      rolesArray.push(this.fb.group(role));
    });

    this.showform = true;
  }

  updateUser() {
    if (this.userForm.invalid) {
      return;
    }

    this.userForm.patchValue({
      UpdatedByName: this.currentUserName,
      UpdatedAt: new Date()
    });

    this.securityService.UpdateUser(this.userForm.value).subscribe(
      () => {
        this.closeForm();
        this.UsersData(); 
      },
      (error) => {
        console.error('Error while updating user:', error);
      }
    );
  }

  get userRolesReq(): FormArray {
    return this.userForm.get('UserRolesReq') as FormArray;
  }

  addUserRole(role: any) {
    this.userRolesReq.push(this.fb.group(role));
  }

  removeUserRole(index: number) {
    this.userRolesReq.removeAt(index);
  }

  onDelete(id: any) {
    if (id) {
      console.log('Deleting user with ID:', id);
      this.securityService.Deleteuser(id).subscribe(
        () => {
          console.log('User deleted successfully with ID:', id);
          this.users = this.users.filter((user: any) => user.Id !== id);
        },
        (error) => {
          console.error('Error deleting user with ID:', id, error);
        }
      );
    } else {
      console.error('Invalid ID:', id);
    }
  }

  submit() {
    debugger
    if (this.userForm.invalid) {
      return;
    }
  
    const formData = this.userForm.value;
  
    if (formData.Id) {
    
      formData.UpdatedByName = this.currentUserName;
      formData.UpdatedAt = new Date();
  
      this.securityService.UpdateUser(formData).subscribe(
        () => {
          this.closeForm();
          this.UsersData(); 
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
                                                                                                                
      formData.CreatedByName = this.currentUserName;
      formData.UpdatedByName = this.currentUserName;
      formData.CreatedAt = new Date();
      formData.UpdatedAt = new Date();
  
      this.securityService.AddUser(formData).subscribe(
        () => {
          this.closeForm();
          this.UsersData(); 
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}
