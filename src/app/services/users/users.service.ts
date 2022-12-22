import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + "users", httpOptions);
  }

  getUser(id:any):Observable<User>{
    return this.http.get<User>(this.baseUrl + "user/" + id, httpOptions);
  }
}
