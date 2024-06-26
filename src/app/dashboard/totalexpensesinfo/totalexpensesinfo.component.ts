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

  constructor(private fb: FormBuilder, private messageService: MessageService, private service:SecurityService) { }

  ngOnInit(): void {
    this.expensesForm();
    this.ExpensesListdata();
  }

  expensesForm() {
    this.ExpenseForm = this.fb.group({
      CategoryId: ['', [Validators.required]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ExpenseDate: ['', [Validators.required]],
      Amount: ['', [Validators.required]],
      PaymentMethodId: ['', [Validators.required]],
      StatusId: ['', [Validators.required]],
      uploaddocument: ['', [Validators.required]]
    });
  }

  // ExpensesListdata(){
  //   this.service.GetExpensesData().subscribe((Response:any)=>{
  //     this.products = Response;
  //     console.log(Response);
  //   })
  // }
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
  

  onBasicUploadAuto(event: FileUploadEvent) {  // Updated method signature
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }

  onAdd() {
    this.showform = true;
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
      console.log(this.ExpenseForm.value);
      
    }
    this.showform = false;
  }
// AddExpenses(){
//   this.service.AddExpenses(this.ExpenseForm.value).subscribe((a:any)=>{
//     this.products=a;
//     console.log(a);
//   })
// }
  onEdit(){

  }

  onDelete(){
    
  }
}