import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { lookups } from '../Models/lookups';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface expandedRows {
  [key: string]: boolean;
}
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
  expandedRows: expandedRows = {};
  lookupForm!: FormGroup;
  IsActive: boolean = false;

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void {
    this.lookupsForm();
  }

  lookupsForm() {
    this.lookupForm = this.fb.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      IsActive: ['', [Validators.required]]
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
