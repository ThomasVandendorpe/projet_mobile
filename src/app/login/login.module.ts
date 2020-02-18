import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CreateAccountPage } from '../create-account/create-account.page';
import { CreateAccountPageModule } from '../create-account/create-account.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    CreateAccountPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
