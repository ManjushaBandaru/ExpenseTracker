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

  deposits:any[]=[];
  DepositForm!: FormGroup;
  showform: boolean = false;
  globalFilterValue: string = '';

  constructor (private fb: FormBuilder, private service: SecurityService) {}

  ngOnInit(){
    this.depositForm();
    this.DepositData();
  }

  depositForm() {
    this.DepositForm = this.fb.group({
      CategoryName: ['', [Validators.required]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ExpenseDate: ['', [Validators.required]],
      Amount: ['', [Validators.required]],
      PaymentMethodName: ['', [Validators.required]],
      StatusName: ['', [Validators.required]],
      uploaddocument: ['', [Validators.required]]
    });
  }

  DepositData(){
    this.service.GetDepositData().subscribe((Response:any)=>{
      this.deposits = Response;
      console.log(Response);
      
    })
  }

  clear(table: Table){
    this.globalFilterValue = '';
    table.clear();
    this.DepositData();
  }

  onAdd(){

  }

  onEdit(){

  }

  onDelete(){

  }
}
