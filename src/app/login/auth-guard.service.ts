import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { baseUrl } from '../base-url';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService
  ){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean{
    this.authService.redirectUrl = url
    if (localStorage.getItem('curUser'))
    {
      return true;
    } else {
      this.authService.checkAuth()
        .subscribe(res => {
          if(res.email !== "unknown"){
            let token = res
            this.authService.login(token);
            this.router.navigate(['/']);
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
    }
  }
}
