import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { HttpService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Paths } from './services/paths';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { AppComponent } from './components/app/app.component';
// import { HttpClientModule } from '@angular/common/http';
@NgModule({
declarations: [
    
    AuthComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    AuthorizedComponent,
    AppComponent,
  ],
imports: [
  HttpClientModule,
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  ],
providers: [
    HttpService,Paths,CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
