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

  getResultByCourse(course) {
    console.log("Search_course:", course);
    let searchParams = new URLSearchParams();
    searchParams.append('course',course);
    return this.http.get(this.url, {search: searchParams, headers: this.headers})
      .map(res =>{
        console.log("Search_result:", res.json());
        return res.json();
      })
  }

  getResultByTopic(topic) {
    console.log("Search_topic:", topic);
    let searchParams = new URLSearchParams();
    searchParams.append('topic', topic);
    return this.http.get(this.url, {search: searchParams, headers: this.headers})
      .map(res =>{
        console.log("Search_result:", res.json());
        return res.json();
      })
  }
}
