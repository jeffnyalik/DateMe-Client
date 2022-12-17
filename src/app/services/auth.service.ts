import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl
  LOGIN_URL="auths/user-login";
  REGISTER_URL="auths/user-register";
  constructor(private http:HttpClient) { }
  login(model:any){
    return this.http.post(`${this.baseUrl}${this.LOGIN_URL}`, model)
      .pipe(map((response:any) =>{
        const user = response;
        if(user){
          localStorage.setItem("token", user.token)
        }
      }))
  }

  register(model:any){
    return this.http.post(`${this.baseUrl}${this.REGISTER_URL}`, model)
  }
}
