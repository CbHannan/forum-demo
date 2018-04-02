import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: Boolean;
  isAdmin: Boolean;
  model: any = {};
  loading = false;
  returnUrl: string;
  incorrectPass: Boolean = false;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    });
    this.authenticationService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model)
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        console.log("success" + this.model.username + this.model.password);
        this.incorrectPass = false;
      },
      error => {
        this.loading = false;
        console.log("error" + this.model.username + this.model.password);
        this.incorrectPass = true;


      });
  }
  logout() {
    console.log("got logout");
    this.authenticationService.logout();
    this.loading = false;
    this.model.password = '';
    this.router.navigate(['/home']);
}
 
}
