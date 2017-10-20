import { Component, Input, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { BookmarkService } from '../bookmark.service';
import { Bookmark } from '../bookmark';
import { AuthService } from '../login/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import * as $ from 'jquery';

@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})

export class ProblemComponent implements OnInit {

  @Input() problem;
  public showMenu = false;
  public menuClicked = false;
  @Input() public showAnswer = false;
  @Input() public isBookmark: boolean = false;

  constructor(
    private problemService: ProblemService,
    private bookmarkService: BookmarkService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  toggleMenu(event) {
    event.stopPropagation(); //TODO 이렇게 하면 버튼 여러개 누르면, 여러개 열림
    this.showMenu = !this.showMenu;
  }
  closeMenu() {
    this.showMenu = false
  }

  isAuth() {
    let logic = (this.authService.getUserEmail==this.problem.email) || (this.authService.checkAdmin)
    return logic
  }

  toggleAnswer(){
    this.showAnswer = !this.showAnswer
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

  editeProblem(problem) {
    if(this.isAuth()){
      this.router.navigate(['/problem', problem.id, 'edit']);
    } else {

    }
  }
  deleteProblem(problem) {
    if(confirm("정말 문제를 지우시겠습니까?")){
      this.problemService.deleteProblem(problem.id)
        .subscribe(res => {
          if(this.problem){
            this.location.back()
          } else {
            location.reload();
          }
        })
    }
  }
}
