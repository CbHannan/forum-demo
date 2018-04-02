import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.loggedIn();

  }
  resetPassword() {
    const id = +this.route.snapshot.params["id"];

    this.homeService.resetPassword(this.model, id)
      .subscribe(
      data => {
        this.router.navigate(['home']);
        console.log("success" + this.model.password);

      },
      error => {
        console.log("error" + this.model.password);


      });
  }
}
