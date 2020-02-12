import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { CreateAccountPage } from '../create-account/create-account.page';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  createAccountPage : CreateAccountPage
  formAdd: { email: string, password: string } = { email: "", password: "" }
  
  constructor(private router: Router, private auth : AuthGuardService) { }
  
  ngOnInit() {
  }
  
  logForm() {
    console.log(this.formAdd)
    firebase.auth().signInWithEmailAndPassword(this.formAdd.email, this.formAdd.password).then(res=>{
      this.auth.login()
      this.router.navigate(['/todolist'])
    }
      ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }

  }
