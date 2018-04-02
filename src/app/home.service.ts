import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from './models/user';
import { Post } from './models/post';
import { Reply } from './models/reply';
import { Report } from './models/report';


import { Category } from './models/category';


@Injectable()
export class HomeService {
  constructor(private http: Http) { }

  getAllUsers() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getUserById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }
  getUserByUsername(Username: string) {
    return this.http.get('/api/users/username/' + Username, this.jwt()).map((response: Response) => response.json());
  }

  createUser(user: User) {
    return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  }
  sendReset(user: User) {
    return this.http.post('/api/users/reset/password', user, this.jwt()).map((response: Response) => response.json());
  }
  resetPassword(user: User, id: number) {
    console.log("home service reset password got called")
    return this.http.put('/api/users/reset/password/' + id, user, this.jwt()).map((response: Response) => response.json());
  }
  updateUser(user: User) {
    return this.http.put('/api/users/' + user.UserID, user, this.jwt()).map((response: Response) => response.json());
  }

  deleteUser(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  getAllPosts() {
    return this.http.get('/api/posts', this.jwt()).map((response: Response) => response.json());
  }
  getMyPosts(Poster: string) {
    return this.http.get('/api/posts/' + Poster + '/myposts', this.jwt()).map((response: Response) => response.json());
  }

  getPostById(id: number) {
    return this.http.get('/api/posts/' + id , this.jwt()).map((response: Response) => response.json());
  }
  getPostsByCategory(category: string) {
    return this.http.get('/api/posts/' + category + '/posts', this.jwt()).map((response: Response) => response.json());
  }
  getReportedPosts() {
    return this.http.get('/api/posts/posts/reported', this.jwt()).map((response: Response) => response.json());
  }
  getReportedReplies() {
    return this.http.get('/api/posts/replies/reported', this.jwt()).map((response: Response) => response.json());
  }

  createPost(post: Post) {
    return this.http.post('/api/posts', post, this.jwt()).map((response: Response) => response.json());
  }

  updatePost(post: Post) {
    return this.http.put('/api/posts/' + post.PosterID, post, this.jwt()).map((response: Response) => response.json());
  }

  deletePost(id: number) {
    return this.http.delete('/api/posts/' + id, this.jwt()).map((response: Response) => response.json());
  }
  reportPost(id: number, report: Report) {
    return this.http.post('/api/posts/' + id + '/report',report, this.jwt()).map((response: Response) => response.json());
  }
  reportReply(id: number, report: Report) {
    return this.http.post('/api/posts/' + id + '/report/reply', report, this.jwt()).map((response: Response) => response.json());
  }


  getAllCategories() {
    console.log("home service page got the call");
    return this.http.get('/api/categories', this.jwt()).map((response: Response) => response.json());
  }
  getCategoriesToPost() {
    console.log("home service page got the call");
    return this.http.get('/api/categories/create/categories', this.jwt()).map((response: Response) => response.json());
  }

  getCategoryById(id: number) {
    return this.http.get('/api/categories/' + id, this.jwt()).map((response: Response) => response.json());
  }
  getAllReplies() {
    console.log("home service page got the call");
    return this.http.get('/api/posts/replies/all', this.jwt()).map((response: Response) => response.json());
  }
  getRepliesForPost(id: number) {
    return this.http.get('/api/posts/' + id + '/replies', this.jwt()).map((response: Response) => response.json());
  }
  getMyReplies(Poster: string) {
  
    return this.http.get('/api/posts/' + Poster +'/myreplies', this.jwt()).map((response: Response) => response.json());
  }
  createReply(id: number, reply: Reply) {
    console.log("create reply received for reply.Content " + reply);

    return this.http.post('/api/posts/' + id + '/replies', reply, this.jwt()).map((response: Response) => response.json());
  }


  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      console.log("atleast there is a currentuser and token here");
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
