import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { baseUrl } from '../base-url';


@Injectable()
export class AuthService {

  constructor(private http: Http){
  }

  //TODO userEmail 과 isAdmin 을 로그인 시에 설정하면, 번거롭게 항상 함수를 호출할 필요가 없을 듯
  isLoggedIn = this.checkLogin();
  userEmail = this.getUserEmail();
  isAdmin = this.checkAdmin();

  ApiUrl = baseUrl + '/login-admin';
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  checkLogin() {
    if (localStorage.getItem('curUser')){
      return true;
    }
    return false;
  }

  getUserEmail() {
    if (localStorage.getItem('curUser')){
      return JSON.parse(localStorage.getItem('curUser')).email;
    }
    return "";
  }

  checkAdmin() {
    if (localStorage.getItem('curUser')){
      if (JSON.parse(localStorage.getItem('curUser')).email === 'admin'){
        return true;
      }
      return false;
    }
    return false;
  }

  login(info) {
    return this.http.post(this.ApiUrl, info)
      .toPromise()
      .then(res => {
              localStorage.setItem('curUser', JSON.stringify(res.json()));
              this.isLoggedIn = true;
            },
            err => { console.log(err); }
      )
  }

  logout(): void {
    localStorage.removeItem('curUser');
    this.isLoggedIn = false;
  }

}
