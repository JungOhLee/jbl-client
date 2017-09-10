import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {baseUrl} from './base-url';

@Injectable()
export class ProblemService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  private commentUrl = baseUrl + '/comments'
  private problemUrl = baseUrl + '/problem'
  private problemInfoUrl = baseUrl + '/problem-info'

  headers = new Headers(
    {
      'Auth': JSON.parse(localStorage.getItem('curUser')).auth,
      'Email': JSON.parse(localStorage.getItem('curUser')).email
    }
  );

  setSearchParams(problem) {
    let params: URLSearchParams = new URLSearchParams();
    params.append('question', problem.question);
    // params.append('number', problem.number);
    params.append('year', problem.year);
    params.append('topic', problem.topic);
    params.append('course', problem.course);
    return params;
  }

  // Find Problem Info
  findInfo(problemInfo) {
    let params = this.setSearchParams(problemInfo);
    params.append('profs', '');
    params.append('numbers', '');
    console.log(params);
    return this.http.get(this.problemInfoUrl, { search: params, headers: this.headers })
      .map(res => { console.log(res.json()); return res.json() });
  }
  //----------------//
  //  problem CRUD  //
  //--------------//


  addProblem(problem) {
    return this.http.post(this.problemUrl, problem, { headers: this.headers})
      .map(res => res.json());
  }

  getProblem(id) {
    let params = new URLSearchParams();
    params.set("id", id);
    return this.http.get(this.problemUrl, {search: params, headers: this.headers})
      .map(res => {console.log(res.json()); return res.json()})
  }

  updateProblem(problem) {
    return this.http.put(this.problemUrl, problem, { headers: this.headers})
      .map(res => res.json());
  }

  deleteProblem(id) {
    let params = new URLSearchParams();
    params.set("id", id);
    return this.http.delete(this.problemUrl, {search: params, headers:this.headers})
      .map( res => {
        console.log(res);
        return res;
      })
  }

  //------------------//
  // comment CRUD //
  //------------------//
  getComments(problem) {
    let params = this.setSearchParams(problem);
    return this.http.get(this.commentUrl, { search: params, headers: this.headers })
      .map(res => res.json());
  }
  addComment(problem, newComment) {
    let params = this.setSearchParams(problem);
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
