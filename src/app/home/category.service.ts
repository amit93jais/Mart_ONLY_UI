import { Injectable } from '@angular/core';
import { SlideItem } from '../model/slideItem';
import { Category } from './category';

@Injectable()
export class CategoryService {

  private categories = new Array<Category>(
    { name:"Cake", imageurl: '~/images/category/cake.jpg' },
    { name: "Vegies", imageurl: '~/images/category/vegetables.jpg' },
    { name:"Fruits", imageurl: '~/images/category/fruits.jpg' },
    { name: "Dry Fruits", imageurl: '~/images/category/dryfruits.jpg' },
    { name: "Grocery", imageurl: '~/images/category/grocery.jpg' },
  );

  getCategory(): Category[] {
    return this.categories;
  }
}
