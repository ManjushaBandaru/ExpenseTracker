import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { SecurityService } from 'src/app/Services/security.service';




@Component({
  selector: 'app-totalexpensesinfo',
  templateUrl: './totalexpensesinfo.component.html',
  styleUrls: ['./totalexpensesinfo.component.css']
})
export class TotalexpensesinfoComponent implements OnInit {

  products: any[]=[];
  globalFilterValue: string = '';
  @ViewChild('myTab') myTab!: Table;
  ExpenseForm!: FormGroup;
  showform: boolean = false;
  uniqueCategories: any[] = [];
  uniquePaymentMethods: any[] = [];
  uniqueStatuses: any[] = [];
  maxDate: Date = new Date();
  descriptionLength: number = 0;


  constructor(private fb: FormBuilder, private messageService: MessageService, private service:SecurityService) { }

  ngOnInit(): void {
    this.expensesForm();
    this.ExpensesListdata();
  }

  expensesForm() {
    this.ExpenseForm = this.fb.group({
      Id: [''],
      CategoryId: ['', [Validators.required]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ExpenseDate: [new Date(), [Validators.required]],
      Amount: ['', [Validators.required]],
      PaymentMethodId: ['', [Validators.required]],
      StatusId: ['', [Validators.required]],
      // uploaddocument: ['', [Validators.required]]
    });
  }


  ExpensesListdata() {
    this.service.GetExpensesData().subscribe((response: any) => {
      // Store the full dataset for the table
      this.products = response;

      // Extract unique categories, payment methods, and statuses for dropdowns
      this.uniqueCategories = this.getUniqueValues(response, 'CategoryId', 'CategoryName');
      this.uniquePaymentMethods = this.getUniqueValues(response, 'PaymentMethodId', 'PaymentMethodName');
      this.uniqueStatuses = this.getUniqueValues(response, 'StatusId', 'StatusName');

      console.log('Unique Categories:', this.uniqueCategories);
      console.log('Unique Payment Methods:', this.uniquePaymentMethods);
      console.log('Unique Statuses:', this.uniqueStatuses);
    });
  }

  getUniqueValues(data: any[], idKey: string, nameKey: string) {
    return data.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t[idKey] === item[idKey] && t[nameKey] === item[nameKey]
      ))
    );
  }
  
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.descriptionLength = inputElement.value.length;
  }

  onDescriptionInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/[^a-zA-Z ]/g, '');
    inputElement.value = value;
    this.ExpenseForm.controls['Description'].setValue(value);
    this.descriptionLength = value.length;
  }

  // onBasicUploadAuto(event: FileUploadEvent) {  
  //   this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  // }

  onAdd() {
    this.showform = true;
    console.log(this.ExpenseForm.value);
    
  }

  clear() {
    this.globalFilterValue = '';
    this.myTab.clear();
    this.ExpensesListdata();
  }

  closeForm() {
    this.showform = false;
    this.ExpenseForm.reset();
  }

  onsubmit() {
    if(this.ExpenseForm.valid){
      this.service.AddExpensesData(this.ExpenseForm.value).subscribe(resp =>{
        console.log(this.ExpenseForm.value);
        this.ExpensesListdata();
      }, (error) => {
        console.error,('Form is not valid unable to add Expense');
      });
    } else {
      this.service.UpdateExpensesData(this.ExpenseForm.value).subscribe(Response =>{
        console.log(this.ExpenseForm.value);
        this.ExpensesListdata();
      },(error)=>{
        console.error,('Form is not valid unable to update Expense');
      });
    }
    this.showform = false;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

  onEdit(product: any) {
    this.showform = true;

    this.ExpenseForm.patchValue({
      Id: product.Id,
      CategoryId: product.CategoryId,
      Description: product.Description,
      ExpenseDate: this.formatDate(product.ExpenseDate), 
      Amount: product.Amount,
      PaymentMethodId: product.PaymentMethodId,
      StatusId: product.StatusId
    });
  }
  
  

  onDelete(){
    
  }
}