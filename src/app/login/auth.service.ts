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

  isLoggedIn = this.checkLogin();
  url = baseUrl + '/login';
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
