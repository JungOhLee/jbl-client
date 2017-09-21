import { Component, Input, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: []
})

export class CommentsComponent implements OnInit {

  @Input() problem;
  @Input() public showComments = false;
  private newCommentBody: string;
  private comments: Array<any> = [];
  @Input() public isBookmark: boolean = false;

  constructor(
    private problemService: ProblemService
  ) { }

  ngOnInit() {

  }

  checkCommentUser(comment) {
    if (JSON.parse(localStorage.getItem('curUser')).email === comment.email) {
      return true
    }
    return false
  }
  toggleComments() {
    this.showComments = !this.showComments
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
