import { Component, OnInit } from '@angular/core';
import { TocService } from '../toc.service';

@Component({
  selector: 'toc-index',
  templateUrl: './toc-index.component.html',
  styles:[]
})

export class TocIndexComponent implements OnInit{

  public tocList
  constructor(private tocService: TocService){

  }

  ngOnInit(){
    this.tocService.getAllTocs()
      .subscribe(res => this.tocList = res)
  }

}
