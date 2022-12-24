import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { MemberEditComponent } from '../components/member-edit/member-edit.component';


@Injectable()
export class PreventUnSavedChanges implements CanDeactivate<MemberEditComponent>{

  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean{
    if(component.editForm.dirty){
      return confirm("Are you sure you want to continue? Any unsaved changes will be lost!")
    }
    return true
  }
}
