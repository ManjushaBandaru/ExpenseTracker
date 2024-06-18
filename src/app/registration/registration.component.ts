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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registrationform = this.fb.group({
      FirstName: ['', [Validators.required, this.alphaOnlyValidator()]],
      LastName: ['', [Validators.required, this.alphaOnlyValidator()]],
      MobileNumber: ['', [Validators.required, this.mobileNumberValidator()]],
      Email: ['', [Validators.required, Validators.email]],
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  alphaOnlyValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z]*$/.test(control.value);
      return valid ? null : { alphaOnly: true };
    };
  }

  mobileNumberValidator(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      // Check if input is numeric and exactly 10 digits
      const valid = /^[0-9]{10}$/.test(control.value);
      if (!valid) {
        return { invalidMobileNumber: true };
      }
      return null;
    };
  }

  submit(): void {
    if (this.registrationform.valid) {
      console.log('Form Submitted', this.registrationform.value);
<<<<<<< HEAD
      
      // Navigate to the sidenav page
      this.route.navigateByUrl('/login');
=======
      this.router.navigateByUrl('/sidenav');
>>>>>>> 4eddaaa3973beaafda09156a515d0609af6934a5
    } else {
      this.registrationform.markAllAsTouched();
    }
  }
<<<<<<< HEAD

  // closeForm(): void {
  //   console.log('Form closed');
  //   this.route.navigateByUrl('/home'); 
  // }
  
=======
>>>>>>> 4eddaaa3973beaafda09156a515d0609af6934a5
}
