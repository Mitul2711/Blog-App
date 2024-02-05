import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toast: NgToastService,
    private router: Router
    ) { }

  uploadImage (selectedImage: any, postData: any, formStatus: any, id: any) {
    const filePath = `postImage/${Date.now()}`;
    console.log(filePath);
    
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe( url => {
        postData.postImgPath = url;
        console.log(postData);

        if (formStatus == 'Edit') {
          this.updateData(id, postData);
        } else {
          this.saveData(postData);
        }
        
      })
    })
  }

  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toast.success({ detail: 'SUCCESS', summary: 'Data Inserted Successfully', duration: 5000 });
      this.router.navigate(['/posts']);
    })
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          var data = a.payload.doc.data();
          var id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadOneData(id: any) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }

  updateData(id: any, postData: any) {
    this.afs.collection('posts').doc(id).update(postData).then(() => {
      this.toast.success({detail: 'SUCCESS', summary: 'Data Updated Successfully..', duration: 5000})
      this.router.navigate(['/posts']);
    })
  }

}
