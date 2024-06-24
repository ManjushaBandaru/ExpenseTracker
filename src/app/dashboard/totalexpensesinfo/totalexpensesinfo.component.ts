import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

interface category {
  name: string;
}
interface paymentmode {
  name: string;
}
interface aprovalstatus {
  name: string;
}


@Component({
  selector: 'app-totalexpensesinfo',
  templateUrl: './totalexpensesinfo.component.html',
  styleUrls: ['./totalexpensesinfo.component.css']
})
export class TotalexpensesinfoComponent implements OnInit {

  products: any;
  globalFilterValue: string = '';
  @ViewChild('myTab') myTab!: Table;
  ExpenseForm!: FormGroup;
  showform: boolean = false;
  category: category[] | undefined;
  paymentmode: paymentmode[] | undefined;
  aprovalstatus: aprovalstatus[] | undefined;



  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.expensesForm();
    this.categorylist();
    this.approvalstatuslist();
    this.paymentmodelist();
  }

  expensesForm() {
    this.ExpenseForm = this.fb.group({
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      expensedate: ['', [Validators.required]],
      paidamount: ['', [Validators.required]],
      paymentmode: ['', [Validators.required]],
      aprovalstatus: ['', [Validators.required]],
      uploaddocument: ['', [Validators.required]]
    });
  }

  categorylist() {
    this.category = [
      { name: 'New York' },
      { name: 'Rome' },
      { name: 'London' },
      { name: 'Istanbul' },
      { name: 'Paris' }
    ];
  }
  paymentmodelist() {
    this.paymentmode = [
      { name: 'New York' },
      { name: 'Rome' },
      { name: 'London' },
      { name: 'Istanbul' },
      { name: 'Paris' }
    ];
  }
  approvalstatuslist() {
    this.aprovalstatus = [
      { name: 'New York' },
      { name: 'Rome' },
      { name: 'London' },
      { name: 'Istanbul' },
      { name: 'Paris' }
    ];
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
  }

  closeForm() {
    this.showform = false;
    this.ExpenseForm.reset();
  }

  onsubmit() {
    if(this.ExpenseForm.valid){
      console.log(this.ExpenseForm.value);
      
    }
  }

  onEdit(){

  }

  onDelete(){
    
  }
}