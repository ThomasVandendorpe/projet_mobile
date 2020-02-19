import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { TodoList, TodoItem } from '../modele';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    id: string;
    todoList : TodoList = {name:"",items:[], owner: ""}
    formAdd: { text: string; } = { text: "" };
    showCheckbox: boolean = true;


    constructor(private db: AngularFirestore,
        private route: ActivatedRoute,
        private listService: ListService) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')
        this.listService.getListByUuid(this.id).subscribe(res=>{
            console.log(res)
            this.todoList = res
        })
    }

    onChange() {
        this.listService.postList(this.todoList,this.id);
    }

    logForm() {
        console.log(this.formAdd)
        this.todoList.items.push({uuid:this.db.createId(),name: this.formAdd.text, complete:false})
        this.listService.postList(this.todoList,this.id);
        this.formAdd.text = "";
    }

    onDelete(i: number) {
        this.todoList.items.splice(i,1)
        this.listService.postList(this.todoList,this.id);
    }
}
