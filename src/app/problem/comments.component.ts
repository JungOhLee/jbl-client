import { Component, Input, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';
import { CommentService } from '../comment.service';
import { Comment } from './comment';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: []
})

export class CommentsComponent implements OnInit {

  @Input() problem;
  @Input() public showComments = false;
  private newCommentBody: string;
  private comments: Comment[] = [];
  @Input() public isBookmark: boolean = false;

  constructor(
    private commentService: CommentService
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
    this.commentService.getComments(this.problem)
      .subscribe(res => { if (res) { this.comments = res } });
  }

  addComment(commentBody) {
    if (commentBody === "") {
      return null;
    }
    let newComment:Comment = {
      "email": JSON.parse(localStorage.getItem('curUser')).email,
      "body": commentBody,
      "problemId": this.problem.id,
      "timestamp": "",
      "likes":[]
    }
    console.log(newComment)
    this.commentService.addComment(this.problem, newComment)
      .subscribe(res => { this.newCommentBody = ""; this.comments.push(res) });
  }

  updateComment(comment) {
    this.commentService.updateComment(comment);
  }

  deleteComment(comment, i) {
    this.commentService.deleteComment(comment)
      .subscribe(res => { this.comments.splice(i, 1); console.log(res); });
  }
}
