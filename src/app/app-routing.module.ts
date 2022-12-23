import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedGuard } from './_guards/shared.guard';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberListsComponent } from './components/member-lists/member-lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [SharedGuard],
    children: [
      {path: 'members', component: MemberListsComponent, resolve: {users: MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
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
