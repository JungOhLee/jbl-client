import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { JblMainComponent } from './jbl-main/jbl-main.component'
import { SearchComponent } from './search/search.component';
import { ProblemFormComponent } from './problem/problem-form.component';
import { PcBoxComponent } from './problem/pc-box.component';
import { ProblemComponent } from './problem/problem.component';
import { TocFormComponent } from './toc/toc-form.component';
import { TocIndexComponent } from './toc/toc-index.component';
import { TocComponent } from './toc/toc.component';

import { AuthGuard } from './login/auth-guard.service';
import { AdminGuard } from './login/admin-guard.service';

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },

  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: JblMainComponent, pathMatch: 'full' },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'problem/new',
        component: ProblemFormComponent
      },
      {
        path: 'problem/:id',
        component: PcBoxComponent
      },
      {
        path: 'problem/:id/edit',
        component: ProblemFormComponent
      },
      {
        path:'',
        canActivateChild: [AdminGuard],
        children: [
          {
            path: 'toc/new',
            component: TocFormComponent
          },
          {
            path: 'toc/:course',
            component: TocComponent
          },
          {
            path: 'toc/:course/edit',
            component: TocFormComponent
          },
          {
            path: 'toc',
            component: TocIndexComponent
          }
        ]
      }

      //이후 routing 추가할 부분
    ]
  },
  { path: '**', redirectTo: ''}
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuard
  ]
})
export class AppRoutingModule {}
