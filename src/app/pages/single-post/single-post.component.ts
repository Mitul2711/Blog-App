import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowPostService } from 'src/app/services/show-post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  singlePostData: any;
  similarPostArray: any;
  
  constructor(private route: ActivatedRoute, private showPostService: ShowPostService) {}

  ngOnInit(): void {
    this.route.params.subscribe(val => {

      this.showPostService.countViews(val['id'])

      this.showPostService.loadOnePost(val['id']).subscribe(post => {
        this.singlePostData = post;
        this.loadSimilarPost(this.singlePostData.category.categoryId)
      })
    })
  }

  loadSimilarPost(categoryId: any) {
    this.showPostService.loadSimilar(categoryId).subscribe(post => {
      this.similarPostArray = post;
    })
  }

}
