import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../search.service';
import { Problem } from '../problem/problem';

@Component({
  selector: 'toc-problems',
  templateUrl: './toc-problems.component.html',
  styleUrls:[]
})
export class TocProblemsComponent {
  @Input() toc;
  @Input() course: string;
  problems: Problem[];
  public searchData;

  constructor(
    searchService: SearchService,
  ){
    searchService.getResultByCourse(this.course).subscribe(res => {
      this.searchData = res
    })
  }

}
