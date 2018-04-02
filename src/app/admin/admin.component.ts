import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { HomeService } from '../home.service';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Reply } from '../models/reply';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  replies: Reply[] = [];


  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadAllPosts();
    this.loadAllUsers();
    this.loadReplies();


  }
  private loadAllUsers() {
    this.homeService.getAllUsers().subscribe(users => { this.users = users; });
  }
  private loadAllPosts() {
    this.homeService.getReportedPosts().subscribe(posts => { this.posts = posts; });
    console.log(this.posts.length + " is the amount of posts");

  }
  private loadReplies() {
    this.homeService.getReportedReplies().subscribe(replies => { this.replies = replies; });
    console.log(this.replies.length + " is the amount of replies");

  }

}
