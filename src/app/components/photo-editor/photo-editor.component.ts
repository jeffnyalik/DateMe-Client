import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileUploader } from 'ng2-file-upload';

import { Photo } from '../../_models/photo';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  baseUrl = environment.apiUrl;
  public uploader:FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  response:string;
  currentMainPhoto: Photo;

  constructor(private authService: AuthService,
    private userService: UsersService,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.intialiazeUploader();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  intialiazeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodeToken.id + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize:10*1024*1024
    });
    this.uploader.onAfterAddingFile = (file) =>{file.withCredentials = false};
    this.uploader.onSuccessItem = (item, response, status, headers) =>{
      if(response){
        const res:Photo = JSON.parse(response);
        const photo = {
          id:res.id,
          url:res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(this.authService.decodeToken.id, photo.id).subscribe(() =>{
      console.log("Photo has been set to main");
      this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      this.getMemberPhotoChange.emit(photo.url);
      this.snackBar.open("Main photo has been set", "", {
        duration: 4000,
        panelClass: ['success-snackbar']
      })
    }, error =>{
      console.log(error);
      this.snackBar.open("Can not set to main", "", {
        duration: 2000,
        panelClass: ['error-snackbar']
      })
    })
  }

}
