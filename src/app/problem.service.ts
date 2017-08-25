import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {baseUrl} from './base-url';

@Injectable()
export class ProblemService {

  constructor( private http: Http ){ }

  private commentUrl = baseUrl + '/comments'

  headers = new Headers(
    {
    'Auth':JSON.parse(localStorage.getItem('curUser')).auth,
    'Email':JSON.parse(localStorage.getItem('curUser')).email}
  );

  setSearchParams(problem){
    let params: URLSearchParams = new URLSearchParams();
    params.append('question', problem.question);
    // params.append('number', problem.number);
    params.append('year', problem.year);
    params.append('topic', problem.topic);
    params.append('course', problem.course);
    return params;
  }

  getComments(problem){
    let params = this.setSearchParams(problem);
    return this.http.get(this.commentUrl,{search: params, headers: this.headers})
      .map(res => res.json());
  }
  addComment(problem, newComment){
    let params = this.setSearchParams(problem);
    return this.http.post(this.commentUrl, newComment, {search: params, headers: this.headers})
      .map(res => res.json());
  }

  updateComment(comment){
    return this.http.post(this.commentUrl, {
      comment: comment
    })
      .map(res => res.json());
  }

  deleteComment(comment){
    return this.http.delete(this.commentUrl, {body: comment, headers: this.headers})
  }
}
