import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router
  ){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url: string = state.url;

    return this.checkAdmin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkAdmin(url: string): boolean{
    if (JSON.parse(localStorage.getItem('curUser')).email==="admin") { return true; }
    this.router.navigateByUrl("/");
    return false;
  }
}
