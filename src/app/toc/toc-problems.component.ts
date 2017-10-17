import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { TocService } from '../toc.service';
import { Problem } from '../problem/problem';

@Component({
  selector: 'toc-problems',
  templateUrl: './toc-problems.component.html',
  styleUrls:['./toc.component.css']
})
export class TocProblemsComponent implements OnInit{
  @Input() toc;
  tocs;
  @Input() course: string;
  @Input() year: string;
  @Output() formOpen: EventEmitter<any> = new EventEmitter();
  @Output() formClose: EventEmitter<any> = new EventEmitter();
  editingId: string;
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
    this.editingId = problem.id;

    this.editProblem=problem;
    this.editMode = true;
    this.formOpen.emit(null);
  }

  closeForm(){
    this.editingId = '';
    this.editMode = false;
    this.formClose.emit(null);
  }

  changeProblem(newProblem){
    let targetId = this.editingId
    if(!newProblem){
      return false
    }
    else {
      for(let firstIndex in this.searchData.contents){
        for(let secondIndex in this.searchData.contents[firstIndex].contents){
          for(let thirdIndex in this.searchData.contents[firstIndex].contents[secondIndex].contents){
            for(let problemIndex in this.searchData.contents[firstIndex].contents[secondIndex].contents[thirdIndex].contents){
              let problem = this.searchData.contents[firstIndex].contents[secondIndex].contents[thirdIndex].contents[problemIndex]
              if(problem.id==targetId){
                this.searchData.contents[firstIndex].contents[secondIndex].contents[thirdIndex].contents[problemIndex] = newProblem;
              }
            }
          }
        }
      }
    }
  }

}
