import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  a: string = '';
  b: string = '';
  // router: any;
  // valCheck: string[] = ['remember'];
  // loginForm!: FormGroup;

  // password!: string;

  constructor(private route: Router) { }


  onSignIn() {
    if (this.a === 'calibrage') {
      if (this.b === '1234') {
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
