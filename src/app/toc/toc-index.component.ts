import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from '../toc.service';


@Component({
  selector: 'toc-index',
  templateUrl: './toc-index.component.html',
  styles:[]
})

export class TocIndexComponent implements OnInit{

  public tocList
  constructor(
    private tocService: TocService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.tocService.getAllTocs()
      .subscribe(res => this.tocList = res)
  }

  deleteToc(course){
    if(confirm("정말 지우시겠습니까?")){
      this.tocService.deleteToc(course)
        .subscribe(res => {
          console.log("Delete succeeded:", res);
          location.reload();
        })
    }
  }
}
