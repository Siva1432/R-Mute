import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketService } from './services/socket.service';
import { TextService } from './services/text.service';
import { OperationHelpersService } from './services/operation-helpers.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    FormsModule
  ],
  providers: [SocketService,TextService,OperationHelpersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
