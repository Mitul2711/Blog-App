import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(formData: any) {
    let categoryData = {
      category: formData.value.category
    }

    let subCategoryData = {
      subCategory: 'subCategory1'
    }

    this.afs.collection('categories').add(categoryData).then(docRef => {
      console.log(docRef);

      // this.afs.doc(`categories/${docRef.id}`).collection('subCategories').add(subCategoryData)

      this.afs.collection('categories').doc(docRef.id).collection('subCategories').add(subCategoryData).then(docRef1 => {
        console.log(docRef1);

        this.afs.collection('categories').doc(docRef.id).collection('subCategories').doc(docRef1.id).collection('subsubCategories').add(subCategoryData).then(docRef2 => {
          console.log('Second level SubCategory saved successfully');
        })  
      })
    })
      .catch(err => {
        console.log(err)
      })

  }

}
