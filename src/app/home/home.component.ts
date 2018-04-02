import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { Post } from '../models/post';
import { Category } from '../models/category';
import { ActivatedRoute, Router } from "@angular/router";
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthenticationService } from '../authentication.service';

import 'rxjs/add/operator/map';
import { MomentModule } from 'angular2-moment';





import { HomeService } from '../home.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  posts: Post[] = [];
  categories: Category[] = [];
  selectedCategory: string;


  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  ngOnInit() {
   // console.log(this.route.snapshot.params["category"]);

   // if (this.route.snapshot.params["category"] == 'general' || 'music' || 'programming' || 'politics' || 'technology' || 'gaming' ) {
   //   console.log("success" + this.route.snapshot.params["category"]);
   //   this.loadPostsByCategory(this.route.snapshot.params["category"]);
   // } else if (this.route.snapshot.params["category"] == 0) {
  //    console.log("error" + this.route.snapshot.params["category"]);
//
  //   this.loadAllPosts();

 //   }
 //   else {
 //     console.log("error" + this.route.snapshot.params["category"]);

    this.authenticationService.loggedIn();
      this.loadAllPosts();

 //   }
    this.loadAllCategories();
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.homeService.deleteUser(id).subscribe(() => { this.loadAllUsers() });
  }
  deletePost(id: number) {
    console.log("delete post ran and received id: " + id);
    this.homeService.deletePost(id).subscribe(() => { this.loadAllPosts() });
  }
  openPost(id: number) {
    this.router.navigate(['/posts', id]);
  }

  private loadAllUsers() {
    this.homeService.getAllUsers().subscribe(users => { this.users = users; });
  }
  private loadAllPosts() {
    this.homeService.getAllPosts().subscribe(posts => { this.posts = posts; });
    console.log(this.posts.length + " is the amount of posts");
  }
  private loadPostsByCategory(category: string) {
    console.log("loadpostsbycategory fired on home component,category returned is " + category);
    this.selectedCategory = category;
    if (category == 'All') {
      this.loadAllPosts();
    }
    else {
      this.homeService.getPostsByCategory(category).subscribe(posts => { this.posts = posts; });
    }
  }
  private loadAllCategories() {
    console.log("load all categories fired on home component");
    this.homeService.getAllCategories().subscribe(categories => { this.categories = categories; });
    console.log(this.categories);
  }
}
