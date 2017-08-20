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


  constructor(public authService: AuthService) {
  }

  checkLogin(){
    if(localStorage.getItem('curUser')){
      return true
    }
    return false
  }
  userName(){
    if(localStorage.getItem('curUser')){
      return JSON.parse(localStorage.getItem('curUser')).email;
    }
    return "";
  }
  logout(){
    this.authService.logout();
  }
}
