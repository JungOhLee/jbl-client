import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from '../toc.service';
import { AuthService } from '../login/auth.service';

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
    private authService: AuthService
  ) {
      this.tocService.getAllTocs().subscribe(res => {
        this.tocList = res;
      })
    }

  ngOnInit() {

  }

  sendQuery(query) {
    this.router.navigate(['/search'],{queryParams: {query: query}});
    console.log(query);
  }
  preventDefault(event){
    event.preventDefault();
  }
  checkAdmin(){
    return this.authService.checkAdmin();
  }
}
