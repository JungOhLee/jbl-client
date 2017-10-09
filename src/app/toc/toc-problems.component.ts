import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { TocService } from '../toc.service';
import { Problem } from '../problem/problem';

@Component({
  selector: 'toc-problems',
  templateUrl: './toc-problems.component.html',
  styleUrls:[]
})
export class TocProblemsComponent implements OnInit{
  @Input() toc;
  tocs;
  @Input() course: string;
  @Input() year: string;
  @Output() formOpen: EventEmitter<any> = new EventEmitter();
  @Output() formClose: EventEmitter<any> = new EventEmitter();
  problems: Problem[];
  editProblem: Problem;
  editMode: Boolean = false;
  public searchData;

  constructor(
    private searchService: SearchService,
    private tocService: TocService
  ){
  }

  ngOnInit(){
    this.tocService.getAllTocs()
      .subscribe(res => this.tocs = res)
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

  openForm(problem){
    this.editProblem=problem;
    this.editMode = true;
    this.formOpen.emit(null);
  }

  closeForm(){
    this.editMode = false;
    this.formClose.emit(null);
  }

}
