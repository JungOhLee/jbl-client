import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  alert ="";

  constructor(
    public authService: AuthService
  ) {
  }

  checkLogin(){
    return this.authService.isLoggedIn;
  }
  userName(){
    return this.authService.getUserEmail();
  }
  logout(){
    this.authService.logout();
  }

}
