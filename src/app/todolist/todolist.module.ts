import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodolistPageRoutingModule } from './todolist-routing.module';

import { TodolistPage } from './todolist.page';
import { EditListPage } from '../edit-list/edit-list.page';
import { EditListPageModule } from '../edit-list/edit-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodolistPageRoutingModule,
    EditListPageModule
  ],
  declarations: [TodolistPage]
})
export class TodolistPageModule {}
