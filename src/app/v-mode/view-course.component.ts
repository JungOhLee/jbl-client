import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router'
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-view-problems',
  templateUrl: './view-problems.component.html',
  styleUrls: ['./view-problems.component.css']
})
export class ViewProblemsComponent implements OnInit {

  private jblData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.searchService.getResult(params.get('query')))
      .subscribe((data) => this.jblData = data.json());
  }

}
