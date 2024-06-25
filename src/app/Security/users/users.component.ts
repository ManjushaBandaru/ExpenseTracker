import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { SecurityService } from 'src/app/Services/security.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

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
  currentuser:any;

  constructor(private securityService: SecurityService, public fb: FormBuilder) {
    var userString = localStorage.getItem('CURRENTUSER');
    if (userString) {
      this.currentuser = JSON.parse(userString);
    }
  }

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
      RoleId: ['', Validators.required],
      EMail: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      IsActive: [true, Validators.required],
      CreatedByName: [null], 
      UpdatedByName: [null], 
      CreatedAt: [new Date()], 
      UpdatedAt: [new Date()], 
    });
    this.userForm.get('CreatedByName')?.setValue(this.currentuser.Id);
    this.userForm.get('UpdatedByName')?.setValue(this.currentuser.Id);
    this.userForm.get('CreatedAt')?.patchValue(new Date());
    this.userForm.get('UpdatedAt')?.patchValue(new Date());
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
      // Handle validation errors
      return;
    }
    var UserRolesReq =[];
    UserRolesReq.push(this.userForm.value);
    this.securityService.AddUser(UserRolesReq).subscribe(
      () => {
        // Handle success
        this.closeForm();
        this.UsersData(); // Refresh user list after adding
        this.userForm.reset(); // Optionally reset the form
      },
      (error) => {
        // Handle error
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
      UpdatedByName: this.currentuser.UpdatedByName,
      CreatedAt: new Date(user.CreatedAt), // Convert string to Date object if necessary
      UpdatedAt: new Date(),
      UserRolesReq: user.UserRoles 
    });

    this.showform = true; // Display the form dialog for editing
  }

  updateUser() {
    if (this.userForm.invalid) {
      // Handle validation errors
      return;
    }

    this.securityService.UpdateUser(this.userForm.value).subscribe(
      () => {
        // Handle success
        this.closeForm();
        this.UsersData(); // Refresh user list after updating
      },
      (error) => {
        // Handle error
        console.error('Error while updating user:', error);
      }
    );
  }

  onDelete(id: any) {
    if (id) {
      console.log('Deleting user with ID:', id);
      this.securityService.Deleteuser(id).subscribe(
        () => {
          console.log('User deleted successfully with ID:', id);
          // Remove the user from the array
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
    if (this.userForm.invalid) {
      console.log
      return;
    }

    const formData = this.userForm.value;

    // Determine if it's an add or update operation based on Id presence
    if (formData.Id) {
      // Update user
      this.securityService.UpdateUser(formData).subscribe(
        () => {
          // Handle success
          this.closeForm();
          this.UsersData(); // Refresh user list after update
        },
        (error) => {
          // Handle error
          console.error('Error updating user:', error);
        }
      );
    } else {
      // Add new user
      this.securityService.AddUser(formData).subscribe(
        () => {
          // Handle success
          this.closeForm();
          this.UsersData(); // Refresh user list after add
        },
        (error) => {
          // Handle error
          console.error('Error adding user:', error);
        }
      );
    }
  }
}
