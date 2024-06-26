import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { SecurityService } from 'src/app/Services/security.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  deposits: any[] = [];
  depositForm!: FormGroup;
  showform: boolean = false;
  globalFilterValue: string = '';
  todayDate: Date = new Date();


  constructor(private fb: FormBuilder, private service: SecurityService) { }

  ngOnInit() {
    this.DepositForm();
    this.DepositData();
  }

  DepositForm() {
    this.depositForm = this.fb.group({
      CarryForwardAmount: ['', Validators.required],
      CreditDate: ['', Validators.required],
      Amount: ['', Validators.required],
      PaymentMethodName: ['', Validators.required]
    });
  }

  DepositData() {
    this.service.GetDepositData().subscribe((Response: any) => {
      this.deposits = Response;
      console.log(Response); // Check if the data is being logged correctly
    });
  }
Adddeposits(){
  this.service.AddDeposits(this.depositForm.value).subscribe((a:any)=>{
    this.DepositData();
    this.depositForm.reset();
  })
}
  clear(table: Table) {
    this.globalFilterValue = '';
    table.clear();
    this.DepositData();
  }

  onAdd() {
    this.showform = true;
    this.depositForm.reset(); // Reset the form, not the boolean
  }

  onEdit(deposit: any) {
    this.showform = true;

    // DateOfBirth :this.formatDate( children.DateOfBirth) ,

    this.depositForm.patchValue(deposit); // Populate the form with the selected deposit data
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;

}

  closeForm() {
    this.showform = false;
    this.depositForm.reset(); // Reset the form when closing
  }

  submit() {
    if (this.depositForm.valid) {
      // Handle form submission
      this.showform = false;
      this.depositForm.reset();
    }
  }

  onDelete(id: any) {
    // Handle delete
  }
}
