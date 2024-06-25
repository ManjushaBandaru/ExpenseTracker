import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { lookups } from '../Models/lookups';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '../Services/security.service';


// interface expandedRows {
//   [key: string]: boolean;
// }
@Component({
  selector: 'app-lookups',
  templateUrl: './lookups.component.html',
  styleUrls: ['./lookups.component.css']
})
export class LookupsComponent implements OnInit{
  lookups: lookups[] = [];
  // @ViewChild('filter') filter!: ElementRef;
  isExpanded: boolean = false;
  showform: boolean = false;
  // expandedRows: expandedRows = {};
  lookupForm!: FormGroup;
  IsActive: boolean = true;

  constructor (private fb: FormBuilder, private service: SecurityService) {}

  ngOnInit(): void {
    this.lookupsForm();
    this.RowExpandData();
  }

  lookupsForm() {
    this.lookupForm = this.fb.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      IsActive: ['', [Validators.required]]
    });
  }

  RowExpandData() {
    this.service.GetLookupsData(this.IsActive).subscribe((data: any) => {
      this.lookups = data.data; // Assuming 'data' has a 'data' property with array of lookups
      console.log(this.lookups);
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  onAdd(){
    this.showform = true;
  }
  clear(table: Table){
    table.clear();
  }

  closeForm(){
    this.showform = false;
    this.lookupForm.reset();
  }

  AddlookupDetails(){
    
  }

  onsubmit(){

  }
}
