import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd} from '@angular/router'
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ProblemComponent } from './problem.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  @ViewChild('toc') toc: ElementRef;
  public jblData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
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
    this.route.queryParamMap
      .switchMap((params: ParamMap) =>
        this.searchService.getResult(params.get('query')))
      .subscribe(res => {this.jblData = res;});
  }

  ngAfterViewInit() {

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
