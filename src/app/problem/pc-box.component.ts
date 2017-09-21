import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from '../problem.service';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'pc-box',
  templateUrl: './pc-box.component.html',
  styleUrls: []
})

export class PcBoxComponent implements OnInit {

  @Input() problem;
  @Input() isBookmark:boolean=false;
  public showComments = false;

  constructor(
    private problemService: ProblemService,
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(param => {
        if(param.id){
          this.problemService.getProblem(param.id)
            .subscribe(problem =>{
              this.problem = problem;
              this.showComments = true;
            });
          this.checkBookmark(param.id);
        }
      })
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
}
