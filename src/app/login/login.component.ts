import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;

  constructor(private route: Router, private fb: FormBuilder) { }

  ngOnInit(){
    this.login();
  }

  login(){
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        // Validators.maxLength(20),
        // Validators.pattern(/^.*@.*$/)  
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
      ]]
    });
  }

  onSignIn() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    if (username === 'calibrage') {
      if (password === 'Calibrage@123') {
        this.route.navigateByUrl('/sidenav');
      } else {
        window.alert('Incorrect Password');
      }
    } else {
      window.alert('Incorrect Username');
    }
  }

  onSignup() {
    this.route.navigateByUrl('/registration')
  }

}
