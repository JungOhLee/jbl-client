import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Routing Module
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';

import { JblMainComponent } from './jbl-main/jbl-main.component';
import { SearchComponent } from './search/search.component';
import { PcBoxComponent } from './problem/pc-box.component';
import { ProblemComponent } from './problem/problem.component';
import { CommentsComponent } from './problem/comments.component';
import { ProblemFormComponent } from './problem/problem-form.component';
import { TocFormComponent } from './toc/toc-form.component';
import { TocComponent } from './toc/toc.component';
import { TocIndexComponent } from './toc/toc-index.component';
import { TocProblemsComponent } from './toc/toc-problems.component'

//Service
import { SearchService} from './search.service';
import { ProblemService } from './problem.service';
import { CommentService } from './comment.service';
import { TocService } from './toc.service';
import { BookmarkService } from './bookmark.service';

//Pipe
import { TopicIdPipe } from './topic-id.pipe';

//External Component
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import { DndModule } from 'ng2-dnd';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';

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
    Ng2Summernote,
    AppComponent,
    TopicIdPipe,
    JblMainComponent,
    SearchBarComponent,
    SearchComponent,
    PcBoxComponent,
    ProblemComponent,
    CommentsComponent,
    ProblemFormComponent,
    TocFormComponent,
    TocComponent,
    TocIndexComponent,
    TocProblemsComponent,
    LoginComponent
  ],
  imports: [
    DndModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LoginRoutingModule,
    AppRoutingModule,
    AutoCompleteModule
  ],
  providers: [
    SearchService,
    ProblemService,
    CommentService,
    TocService,
    BookmarkService
    // {provide: RequestOptions, useClass: AuthRequestOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
