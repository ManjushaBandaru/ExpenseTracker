import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  UserName: string = '';
  Password!: string;
  grant_type!: string;

  constructor(private route: Router,
    private fb: FormBuilder,
    private service: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.login();
  }

  login() {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      grant_type: ['password']
    });
  }

  // onSignIn() {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   const username = this.loginForm.controls['username'].value;
  //   const password = this.loginForm.controls['password'].value;

  //   if (username === 'calibrage') {
  //     if (password === 'Calibrage@123') {
  //       this.route.navigate(['/sidenav/dashboard/admin']);
  //           } else {
  //       window.alert('Incorrect Password');
  //     }
  //   } else {
  //     window.alert('Incorrect Username');
  //   }
  // }

  onSignIn() {
    const loginData = new HttpParams()
      .set('UserName', this.loginForm.get('UserName')!.value)
      .set('Password', this.loginForm.get('Password')!.value)
      .set('grant_type', this.loginForm.get('grant_type')!.value);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.service.tokenlogin(loginData.toString(), { headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Login Successfull!', 'Success');
        this.route.navigate(['/sidenav/dashboard/admin']);
      },
      (error: any) => {
        this.toastr.error('Login failed!', 'failed');
        console.error("Login failed:", error);
      }
    );
    this.loginForm.reset();
  }
}
