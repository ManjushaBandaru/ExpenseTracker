import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  // router: any;
  // valCheck: string[] = ['remember'];
  loginForm!: FormGroup;

  // password!: string;

  constructor(private route: Router, private fb: FormBuilder) { }

  ngOnInit(){

  }

  login(){
    this.loginForm = this.fb.group({

    })
  }


  onSignIn() {
    if (this.username === 'calibrage') {
      if (this.password === '1234') {
        this.route.navigateByUrl('/sidenav');
      } else {
        window.alert('Incorrect Password');
      }
    } else {
      window.alert('Incorrect UserName');
    }
  }
  onSignup() {
    this.route.navigateByUrl('/registration')
  }

}
