import { Component, Input, OnInit} from '@angular/core';
import { ProblemService } from '../problem.service'
@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styles: []
})

export class ProblemComponent implements OnInit{

  @Input() problem;
  public showComments = false;
  private showCommentForm = false;
  private newCommentBody: string;
  private comments =[];
  constructor(
    private problemService: ProblemService
  ){}

  ngOnInit() {
  }

  toggleComments(){
    this.showComments= !this.showComments
  }
  toggleCommentForm(){
    this.showCommentForm =!this.showCommentForm
  }
  editComment(){

  }

  // Comment C(R)UD
  getComments(){
    this.problemService.getComments(this.problem)
    .subscribe(res => this.comments=res);
  }

  addComment(commentBody){
    let newComment = {
      "email": JSON.parse(localStorage.getItem('curUser')).email,
      "body": commentBody
    }
    console.log(newComment)
    this.problemService.addComment(this.problem, newComment)
      .subscribe(res => this.comments.push(res));
  }

  updateComment(comment){
    this.problemService.updateComment(comment);
  }

  deleteComment(comment, i){
    this.problemService.deleteComment(comment)
      .subscribe(res => {this.comments.splice(i,1);console.log(res);});
  }
}