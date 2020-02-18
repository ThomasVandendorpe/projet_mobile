import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TodolistPage } from '../todolist/todolist.page';
import { CreateAccountPage } from '../create-account/create-account.page';
import { LoginPage } from '../login/login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login'
          },
          {
            path: 'login',
            children: [
              {
                path: '',
                loadChildren: '../login/login.module#LoginPageModule'
              }
            ]
          },
          {
            path: 'register',
            children: [
              {
                path: '',
                loadChildren: '../create-account/create-account.module#CreateAccountPageModule'
              }
            ]
          }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
