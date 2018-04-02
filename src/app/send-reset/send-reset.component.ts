import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-send-reset',
  templateUrl: './send-reset.component.html',
  styleUrls: ['./send-reset.component.css']
})
export class SendResetComponent implements OnInit {
  model: any = {};
  loading = false;
  user: User[] = [];


  constructor(
    private router: Router,
    private homeService: HomeService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.loggedIn();

  }
  sendReset() {
this.homeService.getUserByUsername(this.model.username).subscribe(user => {
  this.user = user;
  console.log(this.user.length + " " + this.user[0]["Email"] + " " + this.model.email)
  if (this.user.length == 1 && this.user[0]["Email"] == this.model.email) {
    this.homeService.sendReset(this.model)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.loading = false;

        console.log("success on sendReset");

    
  }

      ,
      error => {
        this.loading = false;
        console.log("error on sendReset()")
      });
  }
});
  
  }
}
