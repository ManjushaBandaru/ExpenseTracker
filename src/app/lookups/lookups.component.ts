import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { LookUpDetails, lookups } from '../Models/lookups';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SecurityService } from '../Services/security.service';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';


@Component({
  selector: 'app-lookups',
  templateUrl: './lookups.component.html',
  styleUrls: ['./lookups.component.css']
})
export class LookupsComponent implements OnInit {
  lookups: lookups[] = [];
  lookupDetails: LookUpDetails[] = [];
  isExpanded: boolean = false;
  showform: boolean = false;
  lookupForm!: FormGroup;
  IsActive: boolean = true;
  formbuilder: any;
  globalFilterValue: string = '';

  ShowlookupDetails: boolean = false;
  falookUpDetails!: FormArray;
  isLookupChecked: boolean = false;
  lookupNames: string[] = [];

  constructor(private fb: FormBuilder, private service: SecurityService) { }

  ngOnInit(): void {
    this.lookupsForm();
    this.RowExpandData();
  }

  lookupsForm() {
    this.lookupForm = this.fb.group({
      Name: ['', [Validators.required]],
      IsActive: ['', [Validators.required]],
      LookUpDetailReq: this.fb.array([])
    });
  }


  RowExpandData() {
    this.service.GetLookupsData(this.IsActive).subscribe((data: any) => {
      this.lookups = data as lookups[]; 
      console.log(this.lookups);
      this.lookups.forEach(element => {
        element.expandLookupDetails = JSON.parse(element.LookupDetails) as LookUpDetails[];
        console.log(element.expandLookupDetails);
      });
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  falookupDetails(): FormArray {
    return this.lookupForm.get("LookUpDetailReq") as FormArray
  }

  formArrayControls(i: number, formControlName: string) {
    return this.falookupDetails().controls[i].get(formControlName);
  }

  generaterow(LookUpDetailReq: any = {}): FormGroup {
    return this.fb.group({
      lookupId: [LookUpDetailReq.lookupId],
      // lookupDetailId: [lookupDetail.lookupDetailId],
      // fkeySelfId: [lookupDetail.fkeySelfId],
      // code: new FormControl(lookupDetail.code, [Validators.minLength(2)]),
      Name: new FormControl(LookUpDetailReq.Name, [Validators.required, Validators.minLength(2)]),
      Description: new FormControl(LookUpDetailReq.Description),
      IsActive: new FormControl(LookUpDetailReq.IsActive, [Validators.required])
    })
  }


  addLookupDetails() {
    console.log(this.falookUpDetails);
    if (this.lookupForm.controls['LookUpDetailReq'].invalid) {
      this.lookupForm.controls['LookUpDetailReq'].markAllAsTouched();

      const lookUpDetailsArray = this.lookupForm.get("LookUpDetailReq") as FormArray;
      lookUpDetailsArray.controls.forEach((control: any) => {
        const lookupDetailId = control.get('LookUpDetailReq').value;
        if (lookupDetailId) {
          const nameControl:any = control.get('Name');
          if (nameControl.value.length > 2) {
            nameControl.setErrors(null);
            return;
          }
          if (nameControl.value.length < 2) {
            nameControl.setErrors({ 'minlength': true });
            return;
          }
        }
      });
      return;
    } else {
      this.ShowlookupDetails = true;
      this.falookUpDetails = this.lookupForm.get("LookUpDetailReq") as FormArray;
      this.falookUpDetails.insert(0, this.generaterow());
      this.setDefaultIsActiveForAllRows();
    }
  }

  setDefaultIsActiveForAllRows() {
    this.falookUpDetails = this.lookupForm.get("LookUpDetailReq") as FormArray;
    for (let i = 0; i < this.falookUpDetails.length; i++) {
      const subLookupGroup = this.falookUpDetails.at(i);
      const isActiveControl :any= subLookupGroup.get('IsActive');
      if (isActiveControl.value !== false) {
        isActiveControl.setValue(true);
      }
    }
  }

  editLookUp(lookup: any) {
    lookup.expandLookupDetails.forEach((LookUpDetailReq: any) => {
      LookUpDetailReq.lookupId = lookup.lookupId;
      this.falookupDetails().push(this.generaterow(LookUpDetailReq));
    })
    this.lookupForm.patchValue(lookup);
    this.ShowlookupDetails = true;
  }

  onAdd() {
    this.showform = true;
  }
  clear(table: Table) {
    this.globalFilterValue = '';
    table.clear();
    this.RowExpandData();
  }

  closeForm() {
    this.showform = false;
    this.lookupForm.reset();
  }

  
  close(){
    this.showform = false;
    this.lookupForm.reset();
  }

  onsubmit(){
    if (this.lookupForm.value){
      this.service.Addlookups(this.lookupForm.value).subscribe(resp => {
        console.log(this.lookupForm.value);
        this.RowExpandData();
      });
    } else {
      console.log('Invalid Form');
      
    }
    this.showform = false;
  }

  save() {
    if (this.lookupForm.valid) {
      // this.savelookup().subscribe((resp: any) => {
      //   if (resp) {
      //     this.isLookupChecked = false;
      //   }
      // })
    }
    else {
      this.lookupForm.markAllAsTouched();
    }
  }
  savelookup() {
    
  }

}
