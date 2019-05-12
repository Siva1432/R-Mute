import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketService } from './services/socket.service';
import { TextService } from './services/text.service';
import { OperationHelpersService } from './services/operation-helpers.service';
import {FormsModule} from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http'
//import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
  HttpClientModule,
BrowserModule,
   FormsModule,
  ],
  providers: [
    SocketService,
    TextService,
    OperationHelpersService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
