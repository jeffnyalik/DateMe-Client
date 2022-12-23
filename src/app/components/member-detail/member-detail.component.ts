import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../_models/user';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(
    private route:ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    });
  }

  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) =>{
  //     this.user = user;
  //     console.log(user);
  //   })
  // }

}
