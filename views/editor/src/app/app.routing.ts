import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { HttpService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Paths } from './services/paths';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { AppComponent } from './components/app/app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeRootComponent } from './components/home-root/home-root.component';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path:'',
    component:HomeRootComponent,
    children:[
      {
        path: 'signup',
        component: AuthComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'**',
        redirectTo:'/home'
    }
    ]
  },
 
];
@NgModule({
declarations: [
    
    AuthComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    AuthorizedComponent,
    HomeRootComponent
  ],
imports: [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild(appRoutes)
  ],
providers: [
    HttpService,
    Paths,
    CookieService
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

