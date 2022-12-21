import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl =  environment.baseUrl
  baseUrl = "http://localhost:7000/api/"
  LOGIN_URL="auths/user-login";
  REGISTER_URL="auths/user-register";
  jwtHelper = new JwtHelperService();
  decodeToken:any;
  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post(`${this.baseUrl}${this.LOGIN_URL}`, model)
      .pipe(map((response:any) =>{
        const user = response;
        if(user){
          localStorage.setItem("token", user.token)
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodeToken);
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
