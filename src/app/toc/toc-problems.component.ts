import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { Problem } from '../problem/problem';

@Component({
  selector: 'toc-problems',
  templateUrl: './toc-problems.component.html',
  styleUrls:[]
})
export class TocProblemsComponent implements OnInit{
  @Input() toc;
  @Input() course: string;
  @Input() year: string;
  @Output() toggleForm: EventEmitter<any> = new EventEmitter();
  problems: Problem[];
  public searchData;

  constructor(
    private searchService: SearchService,
  ){
  }

  ngOnInit(){
  }
  ngOnChanges(){
    this.fetchData();
  }

  fetchData(){
    let searchKeyVal = { course: this.course, year: this.year }
    this.searchService.search(searchKeyVal).subscribe(res => {
      this.searchData = res
    })
  }


}
