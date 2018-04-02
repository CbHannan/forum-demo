import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';





@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  model: any = {};
  loading = false;
  categories: Category[] = [];
  selectedCategory: string;
  categoryName: string;



  constructor(
    private router: Router,
    private homeService: HomeService,
    private authenticationService: AuthenticationService) { }
  ngOnInit() {
    this.authenticationService.loggedIn();

    this.loadAllCategories();
  }

  createPost() {
    console.log("title should be printed here:" + this.model.title);
    if (!this.model.category || !this.model.title || !this.model.content) {
      return
    }
    this.loading = true;
    this.homeService.createPost(this.model)
      .subscribe(
      data => {
        //  set success message and pass true paramater to persist the message after redirecting to the login page
        this.router.navigate(['/home']);
        console.log('The category in the model is ' + this.model.category)
      },
      error => {
        console.log('create post failed')
        this.loading = false;
      });
  }
  private loadAllCategories() {
    console.log("load all categories fired on createpost component");
    this.homeService.getCategoriesToPost().subscribe(categories => { this.categories = categories; });
    console.log(this.categories);
  }
  private selectCategory(categoryName: string) {
    this.selectedCategory = categoryName;
    this.model.category = categoryName;
    console.log(this.model.category);
    

  }
}
