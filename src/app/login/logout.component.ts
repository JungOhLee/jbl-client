import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { baseUrl } from '../base-url';

@Component({
  template: ''
})

export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.logout();
    localStorage.removeItem('curUser');
    window.location.href= baseUrl +'/logout';
  }

}
