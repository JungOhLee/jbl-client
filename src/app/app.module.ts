import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Routing Module
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login-routing.module';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchService} from './search.service';
import { ProblemService } from './problem.service';
import { LoginComponent } from './login.component';

import { JblMainComponent } from './jbl-main/jbl-main.component';
import { ViewProblemsComponent } from './view-problems/view-problems.component';
import { DiscussProblemsComponent } from './d-mode/discuss-problems.component';
import { ProblemComponent } from './d-mode/problem.component';

import { TopicIdPipe } from './topic-id.pipe';



import {RequestOptions, BaseRequestOptions} from '@angular/http';
/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
class AuthRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        // this.headers.append("a","b")
    }
}


@NgModule({
  declarations: [
    AppComponent,
    TopicIdPipe,
    JblMainComponent,
    SearchBarComponent,
    ViewProblemsComponent,
    DiscussProblemsComponent,
    ProblemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  providers: [
    SearchService,
    ProblemService,
    // {provide: RequestOptions, useClass: AuthRequestOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
