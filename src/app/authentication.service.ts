import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import 'rxjs/add/operator/map'

import { User } from './models/user';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthenticationService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


 
 
  constructor(private http: Http) { }


  loggedIn() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.isLoggedIn.next(true);
    }
    else {
      this.isLoggedIn.next(false);

    }


  }

  login(user: User) {
    console.log("login method received" + user);
    return this.http.post('/api/users/login', user)
      .map((response: Response) => {
        this.isLoggedIn.next(true);
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          var jwtHelper: JwtHelper = new JwtHelper();
          var decoded = jwtHelper.decodeToken(user.token);

          if (decoded.Access == 'Admin') {
            this.isAdmin.next(true);

          }
        }
        console.log(localStorage.getItem('currentUser'))
        return user;
      });
  }
  verify(user: User, id: number) {
    console.log("verify method received" + user);
    return this.http.post('/api/users/verify/' + id, user)
      .map((response: Response) => {
        this.isLoggedIn.next(true);
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          var jwtHelper: JwtHelper = new JwtHelper();
          var decoded = jwtHelper.decodeToken(user.token);

          if (decoded.Access == 'Admin') {
            this.isAdmin.next(true);

          }
        }
        console.log(localStorage.getItem('currentUser'))
        return user;
      });
  }
 
  logout() {
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
