import { Injectable } from '@angular/core';
import { TodoItem, TodoList } from "./modele";
import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import { map, take, merge } from 'rxjs/operators';

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

  /* public getListByUser(email: string): Observable<TodoList[]> {
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
   
   }*/

  public getReadableListByUser(email: string): Observable<TodoList[]> {
    console.log(email)
    const collection = this.db.collection<TodoList>('items', ref => ref.where('readers', 'array-contains', email))
    return collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }))
  }

  public getOwnedListByUser(email: string): Observable<TodoList[]> {
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

  public getWritableListByUser(email: string): Observable<TodoList[]> {
    console.log(email)
    const collection = this.db.collection<TodoList>('items', ref => ref.where('writers', 'array-contains', email))
    return collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }))
  }

  public getListByUser(email: string): Observable<TodoList[]> {
    return this.getReadableListByUser(email).pipe(merge(this.getOwnedListByUser(email)))
  }

  public getListByUuid(id: string): Observable<TodoList> {
    return this.todolistCollection.doc<TodoList>(id).valueChanges().pipe(
      take(1),
      map(todo => {
        return todo
      }))
  }

  public postList(list: TodoList, id: string) {
    this.todolistCollection.doc<TodoList>(id).update(list)
  }

  public putList(list: TodoList) {
    this.todolistCollection.add(list)
  }

  public deleteList(id: string) {
    this.todolistCollection.doc<TodoList>(id).delete()
  }

  public addReader(email: string, list: TodoList) {
    list.readers.push(email)
    this.todolistCollection.doc<TodoList>(list.id).update(list)
  }

  public addWriter(email: string, list: TodoList) {
    list.writers.push(email)
    this.todolistCollection.doc<TodoList>(list.id).update(list)
  }

  public removeReader(email: string, list: TodoList) {
    const index: number = list.readers.indexOf(email);
    if (index !== -1) {
      list.readers.splice(index, 1);
    }
    this.todolistCollection.doc<TodoList>(list.id).update(list)
  }

  public removeWriter(email: string, list: TodoList) {
    const index: number = list.writers.indexOf(email);
    if (index !== -1) {
      list.writers.splice(index, 1);
    }
    this.todolistCollection.doc<TodoList>(list.id).update(list)
  }

  public updateList(list: TodoList) {
    this.todolistCollection.doc<TodoList>(list.id).update(list)
  }
}
