import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { User } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl =  environment.baseUrl
  baseUrl = environment.apiUrl;
  LOGIN_URL="auths/user-login";
  REGISTER_URL="auths/user-register";
  jwtHelper = new JwtHelperService();
  decodeToken:any;
  currentUser:User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  constructor(private http:HttpClient) { }

  changeMemberPhoto(photoUrl:string){
    this.photoUrl.next(photoUrl);
  }

  login(model:any){
    return this.http.post(`${this.baseUrl}${this.LOGIN_URL}`, model)
      .pipe(map((response:any) =>{
        const user = response;
        if(user){
          localStorage.setItem("token", user.token)
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      }))
  }

  register(model:any){
    return this.http.post(`${this.baseUrl}${this.REGISTER_URL}`, model)
  }

  loggedIn(){
    const token:any = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
