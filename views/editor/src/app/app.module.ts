import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SocketService } from './services/socket.service';
import { TextService } from './services/text.service';
import { OperationHelpersService } from './services/operation-helpers.service';
import {FormsModule} from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { HttpService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
// import { HttpClientModule } from '@angular/common/http';
@NgModule({
declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent
  ],
imports: [
  HttpClientModule,
  BrowserModule,
  FormsModule,
  AppRoutingModule
  ],
providers: [
    SocketService,
    TextService,
    OperationHelpersService,
    HttpService
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
