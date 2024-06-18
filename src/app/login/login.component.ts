import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  loginForm!:FormGroup;

    password!: string;


    onSignIn() {

    }

}
