import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Routing Module
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';

//Components
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';

import { JblMainComponent } from './jbl-main/jbl-main.component';
import { SearchComponent } from './search/search.component';
import { PcBoxComponent } from './problem/pc-box.component';
import { ProblemComponent } from './problem/problem.component';
import { CommentsComponent } from './comment/comments.component';
import { RecentCommentsComponent } from './comment/recent-comments.component'
import { ProblemFormComponent } from './problem/problem-form.component';
import { TocFormComponent } from './toc/toc-form.component';
import { TocComponent } from './toc/toc.component';
import { TocIndexComponent } from './toc/toc-index.component';
import { TocProblemsComponent } from './toc/toc-problems.component';

//Service
import { SearchService} from './search.service';
import { ProblemService } from './problem.service';
import { CommentService } from './comment.service';
import { TocService } from './toc.service';
import { BookmarkService } from './bookmark.service';
import { LoaderService } from './loader.service';

//Pipe
import { TopicIdPipe } from './topic-id.pipe';

//External Component
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import { DndModule } from 'ng2-dnd';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material';

import {RequestOptions, BaseRequestOptions} from '@angular/http';
/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
export class AuthRequestOptions extends BaseRequestOptions {
    withCredentials: boolean = true;
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
    ProblemFormComponent,
    CommentsComponent,
    RecentCommentsComponent,
    TocFormComponent,
    TocComponent,
    TocIndexComponent,
    TocProblemsComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    DndModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LoginRoutingModule,
    AppRoutingModule,
    AutoCompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [
    SearchService,
    ProblemService,
    CommentService,
    TocService,
    BookmarkService,
    LoaderService,
    {provide: RequestOptions, useClass: AuthRequestOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
