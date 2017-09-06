import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {baseUrl} from './base-url';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  headers = new Headers(
    {
      'Auth': JSON.parse(localStorage.getItem('curUser')).auth,
      'Email': JSON.parse(localStorage.getItem('curUser')).email
    }
  );

  private url = baseUrl + '/search'

  getResult(query) {
    console.log(query);
    let searchParams =new URLSearchParams();
    searchParams.append('query', query);
    return this.http.get(this.url, {search: searchParams, headers: this.headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      });
  }

}
