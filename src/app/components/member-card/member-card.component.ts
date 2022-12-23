import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from '../../_models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  users:User[] = [];
  constructor(
    private userService:UsersService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.users = data['users']
    });
  }

  // loadUsers(){
  //   this.userService.getUsers().subscribe((user: User[]) =>{
  //     this.users = user;
  //     console.log(user);
  //   }, error =>{
  //     console.log(error);
  //   })
  // }

}
