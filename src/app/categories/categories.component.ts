import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoriesService) {}
  
  ngOnInit(): void {
    
  }

  onSubmit(data: any) {
    
    let categoryData: Category = {
      category: data.value.category
    }

    this.categoryService.saveData(categoryData);

  }

}
