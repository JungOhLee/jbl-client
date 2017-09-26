import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { baseUrl } from './base-url';

@Injectable()
export class ProblemService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  private ApiUrl = baseUrl + '/problem'

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

  //----------------//
  //  problem CRUD  //
  //----------------//


  addProblem(problem) {
    return this.http.post(this.ApiUrl, problem, { headers: this.headers})
      .map(res => res.json());
  }

  getProblem(id) {
    let params = new URLSearchParams();
    params.set("id", id);
    return this.http.get(this.ApiUrl, {search: params, headers: this.headers})
      .map(res => {
        if(!res.json()){
          alert("해당 질문이 없습니다.");
          this.router.navigateByUrl("/");
        }
        console.log("Got Problem:",res.json());
        return res.json();
      })
  }

  updateProblem(problem) {
    return this.http.put(this.ApiUrl, problem, { headers: this.headers})
      .map(res => res.json());
  }

  deleteProblem(id) {
    let params = new URLSearchParams();
    params.set("id", id);
    return this.http.delete(this.ApiUrl, {search: params, headers:this.headers})
      .map( res => {
        console.log(res);
        return res;
      })
  }

}
