import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../authentication.service';

import { HomeService } from '../home.service';
import { Post } from '../models/post';
import { Reply } from '../models/reply';


import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post[] = [];
  replies: Reply[] = [];
  isPoster: Boolean;

  model: any = {};
  reportModel: any = {};
  isReported: Boolean = false;
  empty: Boolean = false;



  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params["id"];
    console.log(id);
    this.authenticationService.loggedIn();

    this.loadPost();
    this.loadReplies();



  }


  private loadPost() {
    if (!this.authenticationService.isLoggedIn) {
      var userId = JSON.parse(localStorage.getItem('currentUser'));

      var jwtHelper: JwtHelper = new JwtHelper();

      var decoded = jwtHelper.decodeToken(userId.token);
    }
    this.homeService.getPostById(+this.route.snapshot.params["id"]).subscribe(post => {
      this.post = post;
      if (this.authenticationService.isLoggedIn) {
        if (this.post[0].PosterUsername == decoded.username) {
          console.log("from post username is " + this.post[0].PosterUsername + " token username is " + decoded.username);
          return this.isPoster = true;
        }
      }

    }
    );

  }
  deletePost(id: number) {
    console.log("delete post ran and received id: " + id);
    this.homeService.deletePost(id).subscribe(() => { this.router.navigate(['home']); });
  }
  private loadReplies() {
    this.homeService.getRepliesForPost(+this.route.snapshot.params["id"]).subscribe(replies => { this.replies = replies; });
  }
  private createReply() {
    if (this.model.reply == null)
    {
      console.log("empty reply")
      this.empty = true;
    }

   
    if (this.authenticationService.isLoggedIn) {

    this.homeService.createReply(+this.route.snapshot.params["id"], this.model).subscribe(
      data => {
        this.empty = false;
        this.loadReplies();
        this.clearModel();

      
      });
    }
  }
  clearModel() {
    this.model.reply = '';
  }
  private reportPost(postID: number, username: string) {
    if (this.authenticationService.isLoggedIn) {
      var userId = JSON.parse(localStorage.getItem('currentUser'));

      var jwtHelper: JwtHelper = new JwtHelper();

      var decoded = jwtHelper.decodeToken(userId.token);
      this.reportModel.reporter = decoded.username;
      this.reportModel.reported = username;


      this.homeService.reportPost(postID, this.reportModel).subscribe(data =>
      { this.isReported = true });
    }
  }
  private reportReply(replyID: number, username: string) {
    if (this.authenticationService.isLoggedIn) {
      var userId = JSON.parse(localStorage.getItem('currentUser'));

      var jwtHelper: JwtHelper = new JwtHelper();

      var decoded = jwtHelper.decodeToken(userId.token);
      this.reportModel.reporter = decoded.username;
      this.reportModel.reported = username;

      this.homeService.reportReply(replyID, this.reportModel).subscribe()
    }
  }
}
