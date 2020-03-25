import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { TodoList } from '../modele';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ModalController } from '@ionic/angular';
import { EditListPage } from '../edit-list/edit-list.page';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  constructor(
    public listService : ListService,
    public modalController : ModalController
  ) 
  { }

  public todoList : TodoList[]; 
  public readableList : TodoList[]; 
  public writableList : TodoList[]; 
  public ownedList : TodoList[]; 
  public formAdd: { text: string; } = { text: "" };


  ngOnInit() {
    // this.listService.getListByUser(firebase.auth().currentUser.email).subscribe(res=>{
    //   this.todoList = res
    // })
    //TODO: améliorer (un seul observable vaec combineLatest)
    this.listService.getOwnedListByUser(firebase.auth().currentUser.email).subscribe(res=>{
      this.ownedList = res
      this.todoList = this.ownedList.concat(this.writableList).concat(this.readableList)
    })
    this.listService.getReadableListByUser(firebase.auth().currentUser.email).subscribe(res=>{
      this.readableList = res
      this.todoList = this.ownedList.concat(this.writableList).concat(this.readableList)
    })
    this.listService.getWritableListByUser(firebase.auth().currentUser.email).subscribe(res=>{
      this.writableList = res
      this.todoList = this.ownedList.concat(this.writableList).concat(this.readableList)
    })
  }

  logForm() {
    console.log(this.formAdd)
    this.listService.putList({name:this.formAdd.text,items:[], owner: firebase.auth().currentUser.email, readers:[],writers:[]});
    this.formAdd.text = "";
  }
  
  onDelete(i: number) {
    this.listService.deleteList(this.todoList[i].id)
  }

  isReadOnly(i: number) {
    return !(this.todoList[i].writers.includes(firebase.auth().currentUser.email) || this.todoList[i].owner==firebase.auth().currentUser.email)
  }

  isWriteOnly(i: number) {
    return this.todoList[i].writers.includes(firebase.auth().currentUser.email) && !(this.todoList[i].owner==firebase.auth().currentUser.email)
  }

  isOwner(i : number) {
    return this.todoList[i].owner.includes(firebase.auth().currentUser.email);
  }
  
  async presentModal(list_id) {
    const modal = await this.modalController.create({
      component: EditListPage,
      componentProps: {
        'modalctrl': this.modalController,
        'list': this.todoList[list_id]
      }
    });
    await modal.present();
  }
}
