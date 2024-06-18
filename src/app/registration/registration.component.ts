import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      FirstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$'), this.onlyAlphabets]],
      LastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Email: ['', [Validators.required, Validators.email]],
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.registrationform.valid) {
      console.log('Form Submitted', this.registrationform.value);
      this.router.navigateByUrl('/sidenav');
    } else {
      this.registrationform.markAllAsTouched();
    }
  }

  closeForm(): void {
    console.log('Form closed');
    this.router.navigateByUrl('/home');
  }

  onlyAlphabets(event: KeyboardEvent): void {
    const charCode = event.charCode || event.keyCode || event.which;
    const inputChar = String.fromCharCode(charCode);
    if (!/^[A-Za-z]+$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
