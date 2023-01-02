import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any = {};
  mode:ProgressSpinnerMode = 'indeterminate';
  constructor(public authService:AuthService,
     private _snackbar:MatSnackBar,
     private router: Router,
     ) { }

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
    }, () =>{
      this.router.navigate(['/members']);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }
  loggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodeToken = null;
    this.authService.currentUser = null;
    console.log("Logged Out successfully");
    this.router.navigate(['/home']);
  }


}
