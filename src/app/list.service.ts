import { Injectable } from '@angular/core';
import { TodoItem, TodoList } from "./modele";
import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ListService {

    private todolistCollection: AngularFirestoreCollection<TodoList>;
    private todolists: Observable<TodoList[]>

    constructor(private db: AngularFirestore) {
       this.todolistCollection = db.collection('items');
       this.todolists = this.todolistCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }))

        
    }
    
    public getList(): Observable<TodoList[]> {
        return this.todolists;
    }
    
    public getListByUser(email: string): Observable<TodoList[]> {
        console.log(email)
        const collection = this.db.collection<TodoList>('items', ref => ref.where('owner', '==', email))
        return collection.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            }))
    
    }

    public getListByUuid(id: string): Observable<TodoList> {
        return this.todolistCollection.doc<TodoList>(id).valueChanges().pipe(
            take(1),
            map(todo => {
              return todo
            }))
    }

    public postList(list: TodoList,id : string) {
        this.todolistCollection.doc<TodoList>(id).update(list)
    }

    public putList(list:TodoList){
        this.todolistCollection.add(list)
    }

    public deleteList(id:string){
        this.todolistCollection.doc<TodoList>(id).delete()
    }

}
