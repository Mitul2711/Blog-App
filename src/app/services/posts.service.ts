import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toast: NgToastService
    ) { }

  uploadImage (selectedImage: any, postData: any) {
    const filePath = `postImage/${Date.now()}`;
    console.log(filePath);
    
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe( url => {
        postData.postImgPath = url;
        console.log(postData);

        this.afs.collection('posts').add(postData).then(docRef => {
          this.toast.success({ detail: 'SUCCESS', summary: 'Data Inserted Successfully', duration: 5000 })
        })
        
      })
    })
  }

}
