import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray : any;

  constructor(private categoryService: CategoriesService) {}
  
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData: any) {
    
    let categoryData: Category = {
      category: formData.value.category
    }

    formData.reset();

    this.categoryService.saveData(categoryData);

  }

}
