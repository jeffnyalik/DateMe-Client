import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

import { Photo } from '../../_models/photo';
import { User } from '../../_models/user';
import { UsersService } from '../../services/users/users.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route:ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    });
    this.galleryOptions  = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages(){
    const imageUrls = [];
    for(const photo of this.user.photos){
      imageUrls.push({
        small: photo.url,
        medium:photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    console.log(imageUrls);
    return imageUrls;
  }

  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) =>{
  //     this.user = user;
  //     console.log(user);
  //   })
  // }

}
