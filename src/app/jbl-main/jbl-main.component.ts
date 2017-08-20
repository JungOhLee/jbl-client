import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jbl-main',
  templateUrl: './jbl-main.component.html',
  styleUrls: ['./jbl-main.component.css']
})
export class JblMainComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }

  sendQuery(query) {
    this.router.navigate(['/search'],{queryParams: {query: query}});
    console.log(query);
  }
  preventDefault(event){
    event.preventDefault();
  }

}
