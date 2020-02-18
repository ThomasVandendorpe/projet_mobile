import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  isLoggedIn : Boolean = false

  login() : void {
    this.isLoggedIn = true;
  }

  logout() : void {
    this.isLoggedIn = false;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    if (!this.isLoggedIn) {
      this.router.navigate(["home/login"]);
      return false;
    }

    return true;
  }
  
}