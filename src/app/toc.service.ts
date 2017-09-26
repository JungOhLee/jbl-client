import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { baseUrl } from './base-url';

@Injectable()
export class TocService {

  constructor(private http: Http) { }

  headers = new Headers(
    {
      'Auth': JSON.parse(localStorage.getItem('curUser')).auth,
      'Email': JSON.parse(localStorage.getItem('curUser')).email
    }
  );

  private ApiUrl = baseUrl + '/toc'

  getAllTocs() {
    return this.http.get(this.ApiUrl, {headers: this.headers })
      .map(res => {
        console.log(res.json());
        return res.json().courses;
      });
  }
  getToc(course) {
    let searchParams =new URLSearchParams();
    searchParams.append('course', course);
    return this.http.get(this.ApiUrl, {search:searchParams, headers: this.headers })
      .map(res => {
        console.log(res.json());
        return res.json().courses.find(object => object.course ===course);
      });
  }

  addToc(toc){
    return this.http.post(this.ApiUrl, toc, {headers: this.headers})
      .map(res => {
        console.log("Toc Post succeeded:", res.json());
        return res.json();
      })
  }
  updateToc() {

  }

  deleteToc(course) {
    let params = new URLSearchParams();
    params.set("course", course);
    return this.http.delete(this.ApiUrl, {search: params, headers:this.headers})
      .map( res => {
        res.json()
      })
  }
}
