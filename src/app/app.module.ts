import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { JwtModule } from '@auth0/angular-jwt';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './error.inceptor';

import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberListsComponent } from './components/member-lists/member-lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { AlertifyService } from './services/alerts/alertify.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MessagesComponent,
    ListsComponent,
    MemberListsComponent,
    UsersComponent,
    MemberCardComponent,
    MemberDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7000"],
        disallowedRoutes: ["http://localhost:7000/api/auths"],
      },
    }),
    BsDropdownModule.forRoot({})
  ],
  providers: [
    AlertifyService,
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    },
    MemberDetailResolver,
    MemberListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
