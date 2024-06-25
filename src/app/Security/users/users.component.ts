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

  userForm!:FormGroup;
  showform:boolean=false;
  users:any[]=[];
  roles: any[] = [];
  
  availableColumns: any[] | undefined;
  selectedColumns: any[] | undefined;
  globalFilterValue: string = '';
  @ViewChild('myTab') myTab!: Table;
  toastr: any;


  constructor(private SecurityService: SecurityService,  public fb: FormBuilder){}


  ngOnInit() {
    this.UsersData();
    this.UsersForm();
    this.availableColumns = [
      { field: 'CreatedAt', header: 'Created At' },
      { field: 'UpdatedAt', header: 'Updated At' },
      { field: 'CreatedByName', header: 'Created By Name' },
      { field: 'UpdatedByName', header: 'Updated By Name' }
    ];

    // Initially select both columns
    this.selectedColumns = this.availableColumns;

  }
  isColumnSelected(field: string): boolean {
    return this.selectedColumns?.some(col => col.field === field) ?? false;
  }

   UsersForm(){
    this.userForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],  
      LastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      UserName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      EMail: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      CreatedAt: [''],  
      UpdatedAt: [''],
      IsActive: [false],  
      CreatedByName: ['', []],  
      UpdatedByName: ['', []],
      Id: ['', Validators.required]  
  });
}
   

  UsersData() {
    this.SecurityService.GetUsers().subscribe((a: any) => {
      this.users = a;
      console.log(a);
    })
  }
  

  closeForm(){
    this.showform = false;
  }
  Adduser() {
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
  onAdd(){
    this.showform = true;
    this.userForm.reset();
  }

  clear(table: Table) {
    this.globalFilterValue = '';
    table.clear(); 
    this.UsersData(); 
  }

  onEdit(user: any): void {
    this.userForm.reset();
  
    this.userForm.patchValue({
      FirstName: user.FirstName,
      LastName: user.LastName,
      UserName: user.UserName,
      EMail: user.EMail,
      MobileNumber: user.MobileNumber,
      IsActive: user.IsActive,
      CreatedByName: user.CreatedByName,
      UpdatedByName: user.UpdatedByName,
      Id: user.Id  
    });
  
    // Set the form to show
    this.showform = true;
  }
  
  updateUser() {
    this.SecurityService.UpdateUser(this.userForm.value).subscribe((a: any) => {
      console.log(a);     
      this.UsersData();
    });
  }
 
  onDelete(){

  }
  submit() {
    console.log('Submitting form...');
    if (this.userForm.invalid) {
      console.log('Form is invalid. Cannot submit.');
      return;
    }
  
    const Id = this.userForm.value.Id;
    if (Id === 0) {
      console.log('Adding user...');
      this.Adduser(); 
    } else {
      console.log('Updating user...');
      this.updateUser(); 
    }
   }
}
  
