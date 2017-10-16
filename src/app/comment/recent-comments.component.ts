import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment } from './comment';

@Component({
  selector: "recent-comments",
  templateUrl: "./recent-comments.component.html"
})

export class RecentCommentsComponent {
  private recentComNum = '10';
  public recentComments: Comment[];

  constructor(
    private router: Router,
    private commentService: CommentService
  ){
    commentService.getComments('', this.recentComNum)
      .subscribe( res => {
        this.recentComments = res
      })
  }

  goToProblem(problemId){
    this.router.navigate(['problem', problemId]);
  }

}
