import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toast: NgToastService) { }

  saveData(data:any) {
    
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef);
      this.toast.success({ detail: "SUCCESS", summary: 'Data Insert Successfully..!', duration: 3000 });
    })
      .catch(err => {
        console.log(err);
      })

  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  updateData(id: string | undefined, editData: Partial<unknown>) {
    this.afs.doc(`categories/${id}`).update(editData).then(docRef => {
      this.toast.success({ detail: "SUCCESS", summary: 'Data Updated Successfully..!', duration: 3000 });
    })
  }

  deleteData(id: any) {
    this.afs.doc(`categories/${id}`).delete().then(docRef => {
      this.toast.success({ detail: "SUCCESS", summary: 'Data Deleted Successfully..!', duration: 3000 });
    })
  }

}
