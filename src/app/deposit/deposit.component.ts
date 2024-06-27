import { Component, OnInit } from '@angular/core';
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
  uniquePaymentMethods: any[] = [];
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
      Id: [''], 
      CarryForwardAmount: ['', Validators.required],
      CreditDate: ['', Validators.required],
      Amount: ['', Validators.required],
      PaymentMethodId: ['', Validators.required],
      CreditedTo: ['', Validators.required],
      CreditedBy: ['', Validators.required]
    });
  }
  
  DepositData() {
    this.service.GetDepositData().subscribe((Response: any) => {
      this.deposits = Response;
      console.log(Response);
      this.uniquePaymentMethods = this.getUniqueValues(Response, 'PaymentMethodId', 'PaymentMethodName');
    });
  }

  getUniqueValues(data: any[], idKey: string, nameKey: string) {
    return data.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t[idKey] === item[idKey] && t[nameKey] === item[nameKey]
      ))
    );
  }

  clear(table: Table) {
    this.globalFilterValue = '';
    table.clear();
    this.DepositData();
  }

  onAdd() {
    this.showform = true;
    this.depositForm.reset(); 
  }

  onEdit(deposit: any) {
    this.showform = true;
  
    
    this.depositForm.patchValue({
      Id: deposit.Id,
      CarryForwardAmount: deposit.CarryForwardAmount,
      CreditDate: this.formatDate(deposit.CreditDate),
      Amount: deposit.Amount,
      PaymentMethodId: deposit.PaymentMethodId,
      CreditedBy: deposit.CreditedBy, 
      CreditedTo: deposit.CreditedTo
    });
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
    this.depositForm.reset(); 
  }

  submit() {
    if (this.depositForm.valid) {
      const formData = { ...this.depositForm.value }; 

      if (formData.Id) {
      
        this.service.UpdateDeposit(formData).subscribe(
          (response: any) => {
            console.log('Deposit updated:', response);
            this.DepositData(); 
            this.showform = false; 
            this.depositForm.reset(); 
          },
          (error) => {
            console.error('Error updating deposit:', error);
          
          }
        );
      } else {
        
        this.service.AddDeposits(formData).subscribe(
          (response: any) => {
            console.log('New deposit added:', response);
            this.DepositData(); 
            this.showform = false; 
            this.depositForm.reset(); 
          },
          (error) => {
            console.error('Error adding deposit:', error);
           
          }
        );
      }
    } else {
      console.error('Form is invalid. Cannot submit deposit.');
    }
  }

  onDelete(id: any) {
    // Handle delete
  }
}
