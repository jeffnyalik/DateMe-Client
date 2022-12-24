import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users/users.service';


@Injectable()
export class MemberEditResolver implements Resolve<User>{
  constructor(
    private userService: UsersService,
    private authService:AuthService,
    private snackbar:MatSnackBar,
    private router: Router
  ){}

  resolve(route: ActivatedRouteSnapshot):Observable<User>{
    return this.userService.getUser(this.authService.decodeToken.id).pipe(
      catchError(error =>{
        this.snackbar.open("Problem retrieving data", "", {duration: 2000});
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
