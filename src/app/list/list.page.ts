import { Component, OnInit, DebugElement } from '@angular/core';
import { ListService } from '../list.service';
import { TodoList, TodoItem } from '../modele';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Shake } from '@ionic-native/shake/ngx';
import { Logs } from 'selenium-webdriver';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    id: string;
    todoList : TodoList = {name:"",items:[], owner: "", readers:[], writers:[]}
    formAdd: { text: string; } = { text: "" };
    showCheckbox: boolean = true;


    constructor(private db: AngularFirestore,
        private route: ActivatedRoute,
        private listService: ListService,
        private shake: Shake) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')
        this.listService.getListByUuid(this.id).subscribe(res=>{
            //console.log(res)
            this.todoList = res
        })

        // Start watching for shake gestures and call "onShake"
        // with a shake sensitivity of 40 (optional, default 30)
        if(this.shake){
            this.shake.startWatch(40).subscribe(r=>{
                this.todoList.items.reverse()
            });
         }

    }

    onChange() {
        this.listService.postList(this.todoList,this.id);
    }

    logForm() {
        //console.log(this.formAdd)
        this.todoList.items.push({uuid:this.db.createId(),name: this.formAdd.text, complete:false})
        this.listService.postList(this.todoList,this.id);
        this.formAdd.text = "";
    }

    onDelete(i: number) {
        this.todoList.items.splice(i,1)
        this.listService.postList(this.todoList,this.id);
    }

    canWrite(){
        return this.todoList.writers.includes(firebase.auth().currentUser.email) || firebase.auth().currentUser.email==this.todoList.owner;
    }
}
