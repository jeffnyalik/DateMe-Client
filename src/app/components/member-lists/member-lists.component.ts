import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  constructor(

  ) { }

  ngOnInit(): void {
  }

}
