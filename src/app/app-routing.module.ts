import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { JblMainComponent } from './jbl-main/jbl-main.component'
import { SearchComponent } from './search/search.component';

import { AuthGuard } from './login/auth-guard.service';

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  { path: '', component: JblMainComponent, pathMatch: 'full' },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'search',
        component: SearchComponent
      }
      //이후 routing 추가할 부분
    ]
  }
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
  ]
})
export class AppRoutingModule {}
