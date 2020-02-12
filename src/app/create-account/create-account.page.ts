import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  formAdd: { email: string, password: string } = { email: "", password: "" }

  constructor(public router : Router) { }

  ngOnInit() {
  }

  logForm() {
    console.log(this.formAdd)
    firebase.auth().createUserWithEmailAndPassword(this.formAdd.email, this.formAdd.password).then(
        () => {
          this.router.navigate(['/login'])
        }
      ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
}
