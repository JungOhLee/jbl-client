import { Component, OnInit } from '@angular/core';
import { TocService } from '../toc.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'toc',
  templateUrl: './toc.component.html',
  styles:[]
})

export class TocComponent implements OnInit{

  public toc

  constructor(
    private tocService: TocService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.route.params
      .subscribe( param =>
        {
          this.tocService.getToc(param.course)
            .subscribe(res => {
              if(!res){
                alert("잠시 사용할 수 없거나, 없는 수업목록 입니다. ");
                this.router.navigateByUrl("/toc");
              } else {
                this.toc = res;
                console.log(this.toc);
              }
            })
        })
  }

  ngOnInit(){
  }

  deleteToc(course){
    if(confirm("정말 삭제하시겠습니까?")){
      this.tocService.deleteToc(course)
        .subscribe(res => {
          this.router.navigateByUrl("/toc");
          console.log("Delete succeeded:", res);
        })
    }
  }

}
