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
    this.tocService.deleteToc(course)
      .subscribe(res => {
        console.log("Delete succeeded:", res);
        this.router.navigate(['/toc']);
      })
  }
}
