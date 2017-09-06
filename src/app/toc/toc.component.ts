import { Component, OnInit } from '@angular/core';
import { TocService } from '../toc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'toc',
  templateUrl: './toc.component.html',
  styles:[]
})

export class TocComponent implements OnInit{

  public toc

  constructor(
    private tocService: TocService,
    private route: ActivatedRoute
  ){
    this.route.params
      .subscribe( param =>
        {
          this.tocService.getToc(param.course)
            .subscribe(res => {
              this.toc = res;
              console.log(this.toc);
            })
        })
  }

  ngOnInit(){
  }

}
