import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  incorrectPass: Boolean = false;


  constructor(
            private route: ActivatedRoute,
            private router: Router,
            private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  verify() {
    this.loading = true;
    const id = +this.route.snapshot.params["id"];

    this.authenticationService.verify(this.model, id)
      .subscribe(
      data => {
        this.router.navigate(['home']);
        console.log("success" + this.model.username + this.model.password);
        this.incorrectPass = false;

      },
      error => {
        this.loading = false;
        console.log("error" + this.model.username + this.model.password);
        this.incorrectPass = true;


      });
  }
}
