import { Component, Input, OnInit} from '@angular/core';
import { ProblemService } from '../problem.service';
import { ActivatedRoute, Router} from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styles: []
})

export class ProblemComponent implements OnInit {

  @Input() problem;
  public showComments = false;
  public showOptions = false;
  private newCommentBody: string;
  private comments: Array<any> = [];
  constructor(
    private problemService: ProblemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(param => {
        if(param.id){
          this.problemService.getProblem(param.id)
            .subscribe(problem =>{
              this.problem = problem;
              this.showComments= true;
            })
        }
      })
  }
  toggleOptions() {
    this.showOptions = !this.showOptions
  }
  toggleComments() {
    this.showComments = !this.showComments
  }

  deleteProblem(problem) {
    this.problemService.deleteProblem(problem.id)
      .subscribe(res => {this.router.navigate(["./"]);})
  }

  editComment() {
  }

  checkCommentUser(comment) {
    if (JSON.parse(localStorage.getItem('curUser')).email === comment.email) {
      return true
    }
    return false
  }

  // Comment C(R)UD
  getComments() {
    this.problemService.getComments(this.problem)
      .subscribe(res => { if (res) { this.comments = res } });
  }

  addComment(commentBody) {
    if (commentBody === "") {
      return null;
    }
    let newComment = {
      "email": JSON.parse(localStorage.getItem('curUser')).email,
      "body": commentBody
    }
    console.log(newComment)
    this.problemService.addComment(this.problem, newComment)
      .subscribe(res => { this.newCommentBody = ""; this.comments.push(res) });
  }

  updateComment(comment) {
    this.problemService.updateComment(comment);
  }

  deleteComment(comment, i) {
    this.problemService.deleteComment(comment)
      .subscribe(res => { this.comments.splice(i, 1); console.log(res); });
  }
}
