import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private usersCollection: AngularFirestoreCollection<any>
  
  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection('users');
  }

  public putUser(id:string,pseudo:string){
    let data = {
      pseudo: pseudo
    };    
    this.usersCollection.doc(id).set(data)
}

}
