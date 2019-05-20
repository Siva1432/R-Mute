import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RootRoutingModule } from './root.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
  CommonModule,
  HttpClientModule,
  BrowserModule,
  FormsModule,
  RootRoutingModule
  ],
  bootstrap:[
    AppComponent
  ]
})
export class RootModule { }
