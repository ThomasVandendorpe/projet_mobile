import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { TodoList } from '../modele';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  constructor(private listService : ListService) { }

  private todoList : TodoList[]; 
  private formAdd: { text: string; } = { text: "" };

  ngOnInit() {
    this.listService.getListByUser(firebase.auth().currentUser.email).subscribe(res=>{
      this.todoList = res
    })
  }

  logForm() {
    console.log(this.formAdd)
    this.listService.putList({name:this.formAdd.text,items:[], owner: firebase.auth().currentUser.email});
    this.formAdd.text = "";
  }
  
  onDelete(i: number) {
    this.listService.deleteList(this.todoList[i].id)
  }
  
}
