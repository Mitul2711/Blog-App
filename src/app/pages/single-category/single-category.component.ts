import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowPostService } from 'src/app/services/show-post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  postArray: any;
  categoryName: any;

  constructor(private route: ActivatedRoute, private showPostService: ShowPostService) {}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.categoryName = val['category']
      this.showPostService.loadCategoryPost(val['id']).subscribe(post => {
        this.postArray = post;
      })
    })
  }

}
