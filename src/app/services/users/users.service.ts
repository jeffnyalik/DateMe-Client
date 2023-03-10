import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from 'src/app/_models/user';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "users");
  }

  getUser(id:any):Observable<User>{
    return this.http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(id:number, user:User){
    return this.http.put(this.baseUrl + "users/" + id, user);
  }

  setMainPhoto(userId:number, id:number){
    return this.http.post(this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain", {});
  }

  deletePhoto(userId:number, id:number){
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id)
  }
}
