import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage (selectedImage: any) {
    const filePath = `postImage/${Date.now()}`;
    console.log(filePath);
    
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded successfully');
    })
  }

}
