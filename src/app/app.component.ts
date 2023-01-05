import { Component, OnInit } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Router } from '@angular/router';

import { User } from './_models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(this.authService.loggedIn){
      this.router.navigate(['/members'])
    }
    if(token){
      this.authService.decodeToken = this.jwtHelper.decodeToken(token);
    }
    if(user){
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
