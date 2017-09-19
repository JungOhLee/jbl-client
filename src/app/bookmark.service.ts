import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { baseUrl } from './base-url';
import { Bookmark } from './bookmark';

@Injectable()
export class BookmarkService {

  constructor(private http: Http) { }

  headers = new Headers(
    {
      'Auth': JSON.parse(localStorage.getItem('curUser')).auth,
      'Email': JSON.parse(localStorage.getItem('curUser')).email
    }
  );

  private url = baseUrl + '/bookmark'

  getBookmarks(){
    return this.http.get(this.url, {headers: this.headers})
      .map(res => {
        console.log("Get Bookmark Success: ",res.json());
        return res.json();
      })
  }

  addBookmark(bookmark:Bookmark){
    return this.http.post(this.url, bookmark ,{headers: this.headers})
      .map(res => {
        return res.json();
      })
  }

  deleteBookmark(bookmark:Bookmark){
    return this.http.delete(this.url, {headers:this.headers, search: bookmark})
      .map(res => {
        return res;
      })
  }
}
