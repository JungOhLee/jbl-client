import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  headers = new Headers(
    {
      'Auth': JSON.parse(localStorage.getItem('curUser')).auth,
      'Email': JSON.parse(localStorage.getItem('curUser')).email
    }
  );

  private url = 'http://jbl-api.snumedu.net:5000/search'

  getResult(query) {
    console.log(query);
    let searchParams =new URLSearchParams();
    searchParams.append('query', query);
    console.log(searchParams);
    return this.http.get(this.url, {search: searchParams, headers: this.headers })
      .map(res => res.json());
  }

}