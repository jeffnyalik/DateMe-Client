import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from '../../_models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  users:User[] = [];
  constructor(
    private userService:UsersService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe((user: User[]) =>{
      this.users = user;
      console.log(user);
    }, error =>{
      console.log(error);
    })
  }

}
