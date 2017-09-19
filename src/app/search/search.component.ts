import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';
import { BookmarkService } from '../bookmark.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd} from '@angular/router'
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ProblemComponent } from '../problem/problem.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  @ViewChild('toc') toc: ElementRef;
  public jblData;
  public bookmarkIdArray:Array<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private bookmarkService: BookmarkService
  ) {
    // router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     const tree = router.parseUrl(router.url);
    //     if (tree.fragment) {
    //       const element = document.querySelector("#" + tree.fragment);
    //       if (element) { element.scrollIntoView(element); }
    //     }
    //   }
    // });
  }

  ngOnInit() {
    this.setResult();
    this.setBookmarks();
  }

  setResult(){
    this.route.queryParamMap
      .switchMap((params: ParamMap) =>
        this.searchService.getResultByCourse(params.get('query')))
      .subscribe(res => {
        if(!res){
          this.jblData = {title: "", contents:[{ title: "검색결과가 없습니다.", contents:[{}]}]}
        } else {
          this.jblData = res;
        }
      });
  }

  setBookmarks(){
    this.bookmarkService.getBookmarks()
      .subscribe(bookmarks => {
        let problemIdArray = bookmarks.map(bookmark => bookmark.problemId);
        this.bookmarkIdArray = problemIdArray;
      })
  }

  checkBookmarks(id){
    if(this.bookmarkIdArray){
      return this.bookmarkIdArray.indexOf(id)!==-1
    } else {
      return false
    }
  }

  goToId(event){
    event.preventDefault();
    let id = event.target.text.replace(/ /g, "-");
    const element = document.querySelector("#" + id);
    if (element) { element.scrollIntoView(element); }
  }
  goToTop(){
    window.scrollTo(0, 0)
  }
}
