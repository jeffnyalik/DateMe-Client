import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any = {};
  constructor(private authService:AuthService, private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }
  login = () =>{
      this.authService.login(this.model).subscribe(next =>{
      this._snackbar.open("Logged In Successfully", "", {
        duration: 2000,
        panelClass: ['success-snackbar']
      })
    }, error =>{
      this._snackbar.open("There is an error in the application", "", {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
      console.log(error);
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !! token;

  }
  loggedOut(){
    localStorage.removeItem('token');

    console.log("Logged Out successfully");
  }


}
