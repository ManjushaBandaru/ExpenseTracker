import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [MessageService]
})
export class RegistrationComponent implements OnInit {
  registrationform!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService,  private toastr: ToastrService) {}

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
      const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,15}$/.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  submit(): void {
    if (this.registrationform.valid) {
      console.log('Form Submitted', this.registrationform.value);
      this.toastr.success('Registration successful!', 'Success');
      this.router.navigateByUrl('/login');
    } else {
      this.registrationform.markAllAsTouched();
    }
  }
}
