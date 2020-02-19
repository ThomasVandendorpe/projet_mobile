import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { CreateAccountPage } from '../create-account/create-account.page';
import { AuthGuardService } from '../auth-guard.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  createAccountPage: CreateAccountPage
  formAdd: { email: string, password: string, rpassword: string } = { email: "", password: "", rpassword: "" }
  firstAttempt: boolean = false

  constructor(private router: Router, private auth: AuthGuardService, private modalController: ModalController) { }


  ngOnInit() {
  }

  logForm() {
    console.log(this.formAdd)
    firebase.auth()
      .signInWithEmailAndPassword(this.formAdd.email, this.formAdd.password)
      .then(res => {
        this.auth.login()
        this.router.navigate(['/todolist'])
      },
        err => {
          this.firstAttempt = true
        }
      ).catch(function (error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateAccountPage
    });
    return await modal.present();
  }

  fb_auth() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then(result => {
        this.auth.login()
        this.router.navigate(['/todolist'])
      }).catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
  }

  google_auth() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then(result => {
        this.auth.login();
        this.router.navigate(['/todolist']);
      }).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

  }
}
