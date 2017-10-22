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
  public searchList:Object[] ;
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
    switch(query.type) {
      case "course":
        this.router.navigate(['/search'],{queryParams: {course: query.origin}});
        this.query ="";
        break;
      case "topic":
        this.router.navigate(['/search'],{queryParams: {topic: query.origin}});
        this.query="";
        break;
      case "prof":
        this.router.navigate(['/search'],{queryParams: {prof: query.origin}});
        this.query="";
        break;
      default:
        alert("오류")
    }
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

    let resultList:Object[] = [];
    courseList.map(course => resultList.push({name: "과목: "+course, type: "course", value: course.replace(/\s/g,""), origin: course}))
    topicList.map(topic => resultList.push({name: "수업: "+topic, type:"topic", value: topic.replace(/\s/g,""), origin: topic}))
    profList.map(prof => resultList.push({name: "교수: "+prof, type:"prof", value: prof, origin: prof}))

    // courseList.map(course => resultList.push("과목: "+course))
    // topicList.map(topic => resultList.push("수업: "+topic))
    // profList.map(prof => resultList.push("교수: "+prof))

    this.searchList = resultList;
    console.log(this.searchList);
  }

  filter(query) {
    if (query !== ""){
        this.filteredList = this.searchList.filter(el =>{
            return el["value"].toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
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
