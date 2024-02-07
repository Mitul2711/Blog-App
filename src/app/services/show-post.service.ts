import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ShowPostService implements OnInit {

  constructor(private afs: AngularFirestore,) { }
  ngOnInit(): void {
  }

  loadFeatured() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadCategoryPost(categoryId: any) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadOnePost(postId: any) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilar(categoryId: any) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  countViews(postId: any) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1)
    }
    this.afs.doc(`posts/${postId}`).update(viewsCount).then(() => {})
  }


}
