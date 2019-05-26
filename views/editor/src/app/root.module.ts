import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RootRoutingModule } from './root.routing.module';
import { CookieService } from 'ngx-cookie-service';
import { AppGaurd } from './gaurds/app.gaurd';

@NgModule({
  declarations: [AppComponent],
  imports: [
  CommonModule,
  HttpClientModule,
  BrowserModule,
  FormsModule,
  RootRoutingModule
  ],
  providers:[
    CookieService,
    AppGaurd
  ],
  bootstrap:[
    AppComponent
  ]
})
export class RootModule { }
