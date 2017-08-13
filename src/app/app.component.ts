import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  alert ="";
  userName:string = this.getUserName();

  constructor(public authService: AuthService) {
  }

  checkLogin(){
    if(localStorage.getItem('curUser')){
      return true
    }
    return false
  }
  getUserName(){
    if(localStorage.getItem('curUser')){
      return JSON.parse(localStorage.getItem('curUser')).email;
    }
    return "";
  }
  logout(){
    this.authService.logout();
  }
}
