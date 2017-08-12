import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  search(query) {
    this.router.navigate(['/search',{query: query}])
  }
}
