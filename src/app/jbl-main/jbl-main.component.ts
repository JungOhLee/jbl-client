import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from '../toc.service';
import { AuthService } from '../login/auth.service';
import { SearchService } from '../search.service';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-jbl-main',
  templateUrl: './jbl-main.component.html',
  styleUrls: ['./jbl-main.component.css']
})
export class JblMainComponent implements OnInit {

  public tocList

  constructor(
    private router: Router,
    private tocService: TocService,
    private authService: AuthService,
    private searchService: SearchService,
    private problemService: ProblemService
  ) {}

  ngOnInit() {
    this.tocService.getAllTocs().subscribe(res => {
      this.tocList = res;
    })
  }

  findByCourse(course) {
    this.router.navigate(['/search'],{queryParams: {course: course}});
    console.log("Find course: ", course);
  }
  preventDefault(event){
    event.preventDefault();
  }
  checkAdmin(){
    return this.authService.checkAdmin();
  }

  getCsv(course){
    event.stopPropagation();
    this.searchService.download(course)
      .subscribe(res => {
        this.download(course, res)
      })
  }

  getStat(){
    this.searchService.downloadStat()
      .subscribe(res => {
        this.download("stat", res)
      })
  }

  getAllJBL(){
    this.problemService.downloadAll()
      .subscribe(res => {
        this.download("JBL",res)
      })
  }

  download(course, contents){
    var link = document.createElement("a");
    link.download = course + ".csv";
    link.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(contents);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
  }
}
