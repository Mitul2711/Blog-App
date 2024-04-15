import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

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
  post: any;
  formStatus: string = 'Add New';
  btnStatus: string = 'Save';
  docId: any;
  isDisabled: boolean = true;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {


    this.route.queryParams.subscribe(val => {
      this.docId = val['id'];

      if (this.docId) {
        this.postService.loadOneData(val['id']).subscribe(post => {
          this.post = post;
          
          this.postForm = fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(5)]],
            permalink: [{value: this.post.permalink, disabled: this.isDisabled}, Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required]
          })

          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
          this.btnStatus = 'Edit';
        })
      } else {
        this.postForm = fb.group({
          title: ['', [Validators.required, Validators.minLength(5)]],
          permalink: [{value: '', disabled: this.isDisabled}, Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        })
      }
    })

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
    this.permalink = title.replace(/\s+/g, '-');

  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit() {
    // console.log(this.postForm.getRawValue());
    

    let splitted = this.postForm.value.category.split('-')
    // console.log(splitted)

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.getRawValue().permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    this.postService.uploadImage(this.selectedImage, postData, this.formStatus, this.docId);
    console.log(postData);
    
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-img.png';
  }

}
