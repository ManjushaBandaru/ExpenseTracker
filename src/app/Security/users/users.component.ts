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
  toastr: any;

  constructor(private SecurityService: SecurityService, public fb: FormBuilder) {}

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
        Id: [''], // Initialize with empty string for new user
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        UserName: ['', Validators.required],
        Password: ['', Validators.required],
        RoleId: ['', Validators.required],
        EMail: ['', [Validators.required, Validators.email]],
        MobileNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        IsActive: [true, Validators.required],
        CreatedByName: [''], // Initialize with empty string or null
        UpdatedByName: [''], // Initialize with empty string or null
        CreatedAt: [new Date()], // Initialize with current date or null
        UpdatedAt: [new Date()] // Initialize with current date or null
      });
  
     
    
    }

  UsersData() {
    this.SecurityService.GetUsers().subscribe((a: any) => {
      this.users = a;
      console.log(a);
    });
  }

  Getrolesdropdown() {
    this.SecurityService.GetDropdownRoles().subscribe((a: any) => {
      this.Name = a;
      console.log(a);
    });
  }

  closeForm() {
    this.showform = false;
  }

  Adduser() {
    debugger;
    this.SecurityService.AddUser(this.userForm.value).subscribe(
      () => {
        this.toastr.success('User added successfully', 'Success');
        this.showform = false;
        this.UsersData();
      },
      (error) => {
        console.error('Error while adding data:', error);
        this.toastr.error('Failed to add user', 'Error');
      }
    );
  }

  onAdd() {
    this.showform = true;
    this.userForm.reset();
    // this.userForm.patchValue({ Id: 0 });  // Ensure Id is 0 for new user
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
      UpdatedByName: user.UpdatedByName,
      CreatedAt: new Date(user.CreatedAt), // Convert string to Date object if necessary
      UpdatedAt: new Date(user.UpdatedAt) // Convert string to Date object if necessary
    });

    this.showform = true; // Display the form dialog for editing
  }
  

  updateUser() {
    this.SecurityService.UpdateUser(this.userForm.value).subscribe((a: any) => {
      console.log(a);     
      this.UsersData();
    });
  }

  onDelete(id: any) {
    if (id) {
      console.log('Deleting user with ID:', id);
      this.SecurityService.Deleteuser(id).subscribe(
        () => {
          console.log('User deleted successfully with ID:', id);
          // Remove the user from the array
          this.users = this.users.filter((users: any) => users.Id !== id);
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
      return;
    }

    this.SecurityService.AddUser(this.userForm.value).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.showform = false; // Close the form/dialog on successful submission
        this.userForm.reset(); // Optionally reset the form
      },
      (error) => {
        console.error('Error creating user:', error);
        // Handle error: show error message, etc.
      }
    );
  }
}
