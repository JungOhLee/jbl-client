import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  alert ="";
  showLoader: boolean;

  constructor(
    public authService: AuthService,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(){
    this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
  }

  checkLogin(){
    return this.authService.isLoggedIn;
  }
  userName(){
    return this.authService.getUserEmail();
  }
}
