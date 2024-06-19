import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationform!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registrationform = this.fb.group({
      FirstName: ['', [Validators.required, this.alphaOnlyValidator()]],
      LastName: ['', [Validators.required, this.alphaOnlyValidator()]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Email: ['', [Validators.required, Validators.email, this.gmailOnlyValidator()]],
      UserName: ['', Validators.required],
      Password: ['', [Validators.required, this.passwordValidator()]]
    });
  }

  alphaOnlyValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z]*$/.test(control.value);
      return valid ? null : { alphaOnly: true };
    };
  }

  gmailOnlyValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /@gmail\.com$/.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  passwordValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  submit(): void {
    if (this.registrationform.valid) {
      console.log('Form Submitted', this.registrationform.value);
      this.router.navigateByUrl('/sidenav');
    } else {
      this.registrationform.markAllAsTouched();
    }
  }

  
}
