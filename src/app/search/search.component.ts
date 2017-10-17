import { Component, OnInit, AfterContentInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';
import { BookmarkService } from '../bookmark.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd} from '@angular/router'
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ProblemComponent } from '../problem/problem.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, AfterViewChecked, AfterContentInit{

  @ViewChild('toc') toc: ElementRef;
  public jblData;
  public bookmarkIdArray:Array<string>;
  public showProblems = [];
  public showAllProblems = false;
  public showAnswers = false;

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
  ngAfterContentInit(){

  }
  ngAfterViewChecked(){
  }

  setResult(){
    this.route.queryParamMap
      .switchMap((params: ParamMap) => {
        let searchObject = {
          course: params.get('course'),
          topic: params.get('topic'),
          year: params.get('year'),
          prof: params.get('prof')
          //TODO Add tags later
        }
        return this.searchService.search(searchObject)
      })
      .subscribe(res => {
        if(!res){
          this.jblData = {title: "", contents:[{ title: "검색결과가 없습니다.", contents:[{}]}]}
        } else {
          this.jblData = res;
          this.checkShowAllProbs(res);
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

  checkShowAllProbs(res){
    if(res.contents.length ==1){
      this.toggleAllProblems(true);
      return false;
    }
    // this.route.queryParamMap
    //   .subscribe((params: ParamMap) => {
    //     if(params.get('topic') || params.get('prof') || ( params.get('year') && params.get('course') ) ){
    //       this.toggleAllProblems(true);
    //       console.log("checkShow");
    //       return false;
    //     }
    //   })
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
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView(element); }
  }

  goToTop(){
    window.scrollTo(0, 0)
  }

  toggleProblems(index){
    this.showProblems[index] = !this.showProblems[index]
  }

  showProbs(index){
    this.showProblems[index] = true;
  }
  toggleAllProblems(show=false){
    this.showAllProblems = show? show : !this.showAllProblems;
    let totalTopicNum = this.jblData.contents.length;
    for( let i = 0; i < totalTopicNum; i ++){
      this.showProblems[i] = show? show: this.showAllProblems;
    }
  }
  toggleAnswers(){
    this.showAnswers = !this.showAnswers
  }
}
