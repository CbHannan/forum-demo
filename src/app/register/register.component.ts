import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  model: any = {};
  loading = false;
  takenUsername: Boolean = false;
  user: User[] = [];


  constructor(
    private router: Router,
    private homeService: HomeService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.loggedIn();
  }

  register() {
    this.loading = true;
    this.homeService.getUserByUsername(this.model.username).subscribe(user => {
      this.user = user;
      if (this.user.length == 1) {
        this.takenUsername = true;
        this.loading = false;
        return;
      }
      else {
        this.takenUsername = false;
        this.homeService.createUser(this.model)
          .subscribe(
          data => {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            this.loading = false;

            console.log("success");
          },
          error => {
            this.loading = false;
          });
      }
    });
  
  }

}
