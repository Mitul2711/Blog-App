import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private afs: AngularFirestore, private toast: NgToastService) { }

  addSubs(subData: any) {
    this.afs.collection('subscribers').add(subData).then(() => {
      console.log('success');
      
    })
  }

  checkSub(subEmail: any) {
    return this.afs.collection('subscribers', ref => ref.where('email', '==', subEmail)).get();
  }

  loadData() {
    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  deleteData(id: any) {
    this.afs.doc(`subscribers/${id}`).delete().then(docRef => {
      this.toast.success({ detail: "SUCCESS", summary: 'Data Deleted Successfully..!', duration: 3000 });
    })
  }

}
