import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Reply } from '../models/reply';
import { ActivatedRoute, Router } from "@angular/router";

import { HomeService } from '../home.service';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  replies: Reply[] = [];
  user: User[] = [];
  model: any = {};
  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadMyPosts();
    this.loadMyReplies();
    this.loadUserInfo();


  }
  
  private loadMyPosts() {
    var userId = JSON.parse(localStorage.getItem('currentUser'));

    var jwtHelper: JwtHelper = new JwtHelper();

    var decoded = jwtHelper.decodeToken(userId.token);
    this.homeService.getMyPosts(decoded.username).subscribe(posts => { this.posts = posts; });
    console.log(this.posts.length + " is the amount of posts");

  }
  private loadMyReplies() {
    var userId = JSON.parse(localStorage.getItem('currentUser'));

    var jwtHelper: JwtHelper = new JwtHelper();

    var decoded = jwtHelper.decodeToken(userId.token);
    this.homeService.getMyReplies(decoded.username).subscribe(replies => { this.replies = replies; });
    console.log(this.replies.length + " is the amount of replies");

  }
  private loadUserInfo() {
    var userId = JSON.parse(localStorage.getItem('currentUser'));

    var jwtHelper: JwtHelper = new JwtHelper();

    var decoded = jwtHelper.decodeToken(userId.token);
    this.homeService.getUserByUsername(decoded.username).subscribe(user => { this.user = user; });
    console.log(this.user + " is the username");

  }
}
