import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this will be passed from the route config
    // on the data property
    

    var user = JSON.parse(localStorage.getItem('currentUser'));
    var jwtHelper: JwtHelper = new JwtHelper();


    // decode the token to get its payload
    var tokenPayload = jwtHelper.decodeToken(user.token);


    if (tokenPayload.Access !== 'Admin') {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

}
