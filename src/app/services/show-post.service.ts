import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowPostService implements OnInit {

  constructor(private afs: AngularFirestore,) { }
  ngOnInit(): void {
  }

  loadFeatured() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

}
