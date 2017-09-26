import { Component, OnInit, ElementRef } from '@angular/core';
import { TocService } from '../toc.service';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  public query:string;
  public searchList:Array<object> ;
  public filteredList:Array<any> ;

  constructor(
    private tocService: TocService,
    private searchService: SearchService,
    private router: Router,
    public elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.tocService.getAllTocs()
      .subscribe( tocs => {
        this.setSearchList(tocs);
      })
  }

  search(query) {
    this.router.navigate(['/search',{query: {course: query}}])
  }

  setSearchList(tocs){

    let courseList:Array<string>=[];
    let topicList:Array<string>=[];
    let profList:Array<string>=[];
    function unique(value, index, self) {
      return self.indexOf(value) === index;
    }
    tocs.map(toc => {
      courseList.push(toc.course);
      toc.topics.map(topic => {
        topicList.push(topic.topic);
        topic.profs.map(prof => {
          profList.push(prof)
        })
      })
    })

    let resultList:Array<object> = [];
    courseList.map(course => resultList.push({course: course, value: course.replace(/\s/g,"")}))
    topicList.map(topic => resultList.push({topic: topic, value: topic.replace(/\s/g,"")}))
    profList.map(prof => resultList.push({prof: prof, value: prof}))

    this.searchList = resultList;
    console.log(this.searchList);
  }

  filter() {
    if (this.query !== ""){
        this.filteredList = this.searchList.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
  }


  test(course){
    this.searchService.download(course)
      .subscribe(res => {
        this.download(res)
      })
  }

  download(res){
    var link = document.createElement("a");
    link.download = "test.csv";
    link.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(res);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
  }

}
