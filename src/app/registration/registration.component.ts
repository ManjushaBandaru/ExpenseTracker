import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationform!:FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationform = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Email: ['', [Validators.required, Validators.email]],
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  submit(){

  }

  closeForm(){
    
  }
  
}
