import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {baseUrl} from './base-url';

@Injectable()
export class TocService {

  constructor(private http: Http) { }

  headers = new Headers(
    {
      'Auth': JSON.parse(localStorage.getItem('curUser')).auth,
      'Email': JSON.parse(localStorage.getItem('curUser')).email
    }
  );

  private url = baseUrl + '/toc'

  getAllTocs() {
    return this.http.get(this.url, {headers: this.headers })
      .map(res => res.json());
  }
  getToc(course) {
    let searchParams =new URLSearchParams();
    searchParams.append('course', course);
    return this.http.get(this.url, {search:searchParams, headers: this.headers })
      .map(res => res.json()[0]);
  }

  updateToc() {
    
  }

}
