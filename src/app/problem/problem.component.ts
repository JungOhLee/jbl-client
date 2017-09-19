import { Component, Input, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';
import { ActivatedRoute, Router} from '@angular/router';
import { BookmarkService } from '../bookmark.service';
import { Bookmark } from '../bookmark';

import * as $ from 'jquery';

@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})

export class ProblemComponent implements OnInit {

  @Input() problem;
  public showComments = false;
  public showMenu = false;
  public menuClicked = false;
  private newCommentBody: string;
  private comments: Array<any> = [];
  @Input() public isBookmark: boolean = false;

  constructor(
    private problemService: ProblemService,
    private bookmarkService: BookmarkService,
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
            });
          this.checkBookmark(param.id);
        }
      })
  }
  toggleMenu(event) {
    event.stopPropagation(); //TODO 이렇게 하면 버튼 여러개 누르면, 여러개 열림
    this.showMenu = !this.showMenu;
  }
  closeMenu() {
    this.showMenu = false
  }

  toggleComments() {
    this.showComments = !this.showComments
  }

  deleteProblem(problem) {
    if(confirm("정말 문제를 지우시겠습니까?")){
      this.problemService.deleteProblem(problem.id)
        .subscribe(res => {
          location.reload(); //TODO 문제 하나만 보던 페이지에서는 해당 페이지에 다시 가게 됨
        })
    }
  }

  checkBookmark(id){
    this.bookmarkService.getBookmarks()
      .subscribe(bookmarks => {
        let problemIdArray = bookmarks.map(bookmark => bookmark.problemId)
        if(problemIdArray.indexOf(id)===-1){
          return false;
        } else {
          this.isBookmark = true;
        }
      })
  }

  toggleBookmark(){
    if(this.isBookmark){
      this.deleteBookmark(this.problem)
        .subscribe(res => {
          console.log("Bookmark deleted");
          this.isBookmark = !this.isBookmark;
        })
    } else {
      this.addBookmark(this.problem)
        .subscribe(res => {
          console.log("Bookmark added");
          this.isBookmark = !this.isBookmark;
        })
    }

  }

  addBookmark(problem){
    console.log("add Bookmark");
    let newBookmark:Bookmark = { user:"", course: problem.course, problemId: problem.id }
    return this.bookmarkService.addBookmark(newBookmark)
  }
  deleteBookmark(problem){
    console.log("delete Bookmark");
    let bookmark:Bookmark = { user: "", course: problem.course, problemId: problem.id}
    return this.bookmarkService.deleteBookmark(bookmark)
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
