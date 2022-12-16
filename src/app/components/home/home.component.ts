import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean = false;
  values:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getValues();
  }
  getValues = () =>{
    this.http.get('http://localhost:7000/api/values').subscribe(response =>{
      this.values = response
      console.log(this.values);
    }, error =>{
      console.log(error);
    });
  }

  registerToggle(){
    this.registerMode = true
  }

  cancelRegisterMode(registerMode:boolean){
    this.registerMode = registerMode
  }

}
