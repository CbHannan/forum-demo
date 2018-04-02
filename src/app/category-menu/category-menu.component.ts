import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from '../home.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import 'rxjs/add/operator/map'



@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category[] = [];
  categoryBS: BehaviorSubject<string> = new BehaviorSubject<string>('All');


  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadAllCategories();

  }
  private loadAllCategories() {
    console.log("load all categories fired on home component");
    this.homeService.getAllCategories().subscribe(categories => { this.categories = categories; });
    console.log(this.categories);
  }
  onSelect(categoryName: string) {
    this.categoryBS.next(categoryName);
    console.log(categoryName);
  }
}
