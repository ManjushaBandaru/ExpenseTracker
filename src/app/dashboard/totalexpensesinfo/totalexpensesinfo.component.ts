import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { SecurityService } from 'src/app/Services/security.service';

interface category {
  name: string;
}
interface PaymentMethodName {
  name: string;
}
interface StatusName {
  name: string;
}


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
  category: category[] | undefined;
  PaymentMethodName: PaymentMethodName[] | undefined;
  StatusName: StatusName[] | undefined;



  constructor(private fb: FormBuilder, private messageService: MessageService, private service:SecurityService) { }

  ngOnInit(): void {
    this.expensesForm();
    // this.categorylist();
    // this.approvalstatuslist();
    // this.paymentmodelist();
    this.ExpensesListdata();
  }

  expensesForm() {
    this.ExpenseForm = this.fb.group({
      CategoryName: ['', [Validators.required]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ExpenseDate: ['', [Validators.required]],
      Amount: ['', [Validators.required]],
      PaymentMethodName: ['', [Validators.required]],
      StatusName: ['', [Validators.required]],
      uploaddocument: ['', [Validators.required]]
    });
  }

  ExpensesListdata(){
    this.service.GetExpensesData().subscribe((Response:any)=>{
      this.products = Response;
      console.log(Response);
    })
  }

  // categorylist() {
  //   this.category = [
  //     { name: 'New York' },
  //     { name: 'Rome' },
  //     { name: 'London' },
  //     { name: 'Istanbul' },
  //     { name: 'Paris' }
  //   ];
  // }
  // paymentmodelist() {
  //   this.PaymentMethodName = [
  //     { name: 'New York' },
  //     { name: 'Rome' },
  //     { name: 'London' },
  //     { name: 'Istanbul' },
  //     { name: 'Paris' }
  //   ];
  // }
  // approvalstatuslist() {
  //   this.StatusName = [
  //     { name: 'New York' },
  //     { name: 'Rome' },
  //     { name: 'London' },
  //     { name: 'Istanbul' },
  //     { name: 'Paris' }
  //   ];
  // }


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