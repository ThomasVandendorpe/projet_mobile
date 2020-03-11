import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  formAdd: { email: string, password: string, rpassword: string } = { email: "", password: "", rpassword: "" }
  errorMessage : string = ""

  constructor(
    public router : Router,
    public modalCtrl: ModalController, 
    public toastController: ToastController,
    private userService: UserService) { }

  ngOnInit() {
  }

  logForm() {
    console.log(this.formAdd)
    firebase.auth().createUserWithEmailAndPassword(this.formAdd.email, this.formAdd.password).then(
        uc => {
          //this.userService.putUser(uc.user.tenantId,"jean")
          //console.log(uc.user.uid)
          this.router.navigate(['/home/login'])
          this.formAdd = { email: "", password: "", rpassword: "" }
          this.presentToast()
        },
        err =>{
          this.presentToastError()
          this.errorMessage = err.message
        }
      ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your account has been succsessfully created !',
      duration: 2000
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Can\'t create account',
      duration: 2000
    });
    toast.present();
  }
}
