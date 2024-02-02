import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = './assets/placeholder-img.png';
  selectedImage: any;
  categories: any;
  postForm: any;
  permalinkControl: any;

  constructor( private categoryService: CategoriesService, private fb: FormBuilder ) {
    
    this.permalinkControl = new FormControl({ value: '', disabled: true });

    this.postForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      permalink: this.permalinkControl,
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
        this.categories = val;
    })
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview ($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit() {
    console.log(this.postForm.value )
    const postData: Post = {
        title: this.postForm.value.title,
        permalink: this.postForm.value.permalink,
        category: {
          categoryId: '',
          category: ''
        },
        postImgPath: '',
        excerpt: this.postForm.value.excerpt,
        content: this.postForm.value.content,
        isFeatured: false,
        views: 0,
        status: 'new',
        createdAt: new Date()
    }
  }
 
}
