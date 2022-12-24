import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

import { User } from 'src/app/_models/user';

import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm:NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
     private route: ActivatedRoute,
     private snackbar:MatSnackBar,
     private authService: AuthService,
     private userService: UsersService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    });
  }

  updateUser(){
    this.userService.updateUser(this.authService.decodeToken.id, this.user).subscribe(next =>{
      this.snackbar.open("Profile has been Updated successfully", "", {
        duration: 3000,
        panelClass: ['update-snackbar']
      });
      this.editForm.reset(this.user);
    })
  }

}
