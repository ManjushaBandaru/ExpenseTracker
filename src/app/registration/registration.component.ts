import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationform!:FormGroup;
  constructor(private fb: FormBuilder, private route:Router) {}

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

  submit(): void {
    if (this.registrationform.valid) {
      // Process form data here (e.g., send it to a server)
      console.log('Form Submitted', this.registrationform.value);
      
      // Navigate to the sidenav page
      this.route.navigateByUrl('/sidenav');
    } else {
      // Mark all fields as touched to trigger validation messages
      this.registrationform.markAllAsTouched();
    }
  }

  closeForm(): void {
    // Add any logic to close the form or navigate away
    console.log('Form closed');
    this.route.navigateByUrl('/home'); // example route to navigate to home page
  }
  
}
