import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedGuard } from './_guards/shared.guard';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberListsComponent } from './components/member-lists/member-lists.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [SharedGuard],
    children: [
      {path: 'members', component: MemberListsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
    ]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
