import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { baseUrl } from './base-url';
import { Comment } from './problem/comment';

@Injectable()
export class CommentService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  private commentUrl = baseUrl + '/comment'

  headers = new Headers(
    {
      'Auth': JSON.parse(localStorage.getItem('curUser')).auth,
      'Email': JSON.parse(localStorage.getItem('curUser')).email
    }
  );

  setSearchProblemId(problem) {
    let params: URLSearchParams = new URLSearchParams();
    params.append('problemId', problem.id);
    return params;
  }

  //------------------//
  // comment CRUD //
  //------------------//
  getComments(problem) {
    let params = this.setSearchProblemId(problem);
    return this.http.get(this.commentUrl, { search: params, headers: this.headers })
      .map(res => res.json());
  }

  addComment(problem, newComment) {
    let params = this.setSearchProblemId(problem);
    return this.http.post(this.commentUrl, newComment, { search: params, headers: this.headers })
      .map(res => res.json());
  }

  updateComment(comment) {
    return this.http.post(this.commentUrl, {
      comment: comment
    })
      .map(res => res.json());
  }

  deleteComment(comment) {
    return this.http.delete(this.commentUrl, { body: comment, headers: this.headers })
  }
}
