import { Component, Input, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

import { Photo } from '../../_models/photo';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  baseUrl = environment.apiUrl;
  public uploader:FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  response:string;

  constructor(private authService: AuthService) { }

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

}
