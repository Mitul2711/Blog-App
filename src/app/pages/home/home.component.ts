import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ShowPostService } from 'src/app/services/show-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  featuredPostArray: any;
  latestPostArray: any;

  constructor(private showPostService: ShowPostService) {}

  ngOnInit(): void {
    this.showPostService.loadFeatured().subscribe(val => {
      this.featuredPostArray = val
    })

    this.showPostService.loadatest().subscribe(val => {
      this.latestPostArray = val;
    })
  }

 

}
