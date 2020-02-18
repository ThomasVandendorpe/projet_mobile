import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TodolistPage } from '../todolist/todolist.page';
import { CreateAccountPage } from '../create-account/create-account.page';
import { LoginPageModule } from '../login/login.module';
import { CreateAccountPageModule } from '../create-account/create-account.module';

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
                loadChildren: () => import('src/app/login/login.module').then( m => m.LoginPageModule)
              }
            ]
          },
          {
            path: 'register',
            children: [
              {
                path: '',
                loadChildren: () => import('src/app/create-account/create-account.module').then( m => m.CreateAccountPageModule)
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
