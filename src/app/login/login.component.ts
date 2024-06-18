import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  a ='';
  b='';
  router: any;
  valCheck: string[] = ['remember'];
  loginForm!:FormGroup;

    password!: string;

constructor(private route : Router){}


    onSignIn() {
      if(this.a=='calibrage@gmail.com'){
        if(this.b== 'Calibrage@123'){
          this.route.navigateByUrl('dashboard')
        }
        else{
          window.alert('Incorrect UserName')
        }
      }else{
        window.alert('Incorrect Password')
      }
    }

}
