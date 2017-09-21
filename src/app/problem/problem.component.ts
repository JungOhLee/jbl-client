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
  public showMenu = false;
  public menuClicked = false;
  @Input() public isBookmark: boolean = false;

  constructor(
    private problemService: ProblemService,
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router
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
  deleteProblem(problem) {
    if(confirm("정말 문제를 지우시겠습니까?")){
      this.problemService.deleteProblem(problem.id)
        .subscribe(res => {
          location.reload(); //TODO 문제 하나만 보던 페이지에서는 해당 페이지에 다시 가게 됨
        })
    }
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
}
