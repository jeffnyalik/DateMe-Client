import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router,
    private _snackbar: MatSnackBar
  ){}
  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    
    this._snackbar.open("Permission denied", "", {
      duration: 2000,
      panelClass: ['perm-snackbar']
    });
    this.router.navigate(['/home']);
    return false;
  } 
}
