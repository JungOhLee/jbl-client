import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class AuthService {

  constructor(private http: Http){
  }

  isLoggedIn = this.checkLogin();
  url = 'http://jbl-api.snumedu.net:5000/login'
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  checkLogin() {
    if (localStorage.getItem('curUser')){
      return true;
    }
    return false;
  }

  login(info) {
    return this.http.post(this.url, info)
      .toPromise()
      .then(res =>
        {
          localStorage.setItem('curUser', JSON.stringify(res.json()));
          this.isLoggedIn = true;}
      )
  }

  logout(): void {
    localStorage.removeItem('curUser');
    this.isLoggedIn = false;
  }

}