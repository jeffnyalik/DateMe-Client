import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UsersService } from '../services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberDetailResolver implements Resolve<User>{
  constructor(
    private userService: UsersService,
    private snackbar:MatSnackBar,
    private router: Router
  ){}

  resolve(route: ActivatedRouteSnapshot):Observable<User>{
    return this.userService.getUser(route.params['id']).pipe(
      catchError(error =>{
        this.snackbar.open("Problem retrieving data", "", {duration: 2000});
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
