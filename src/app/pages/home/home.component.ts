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

  constructor(private showPostService: ShowPostService) {
    this.showPostService.loadFeatured().subscribe(val => {
      this.featuredPostArray = val
    })
  }

  ngOnInit(): void {
  }

}
