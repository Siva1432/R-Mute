import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service';
import { Subscriber, Subscribable,Subscription } from 'rxjs'
import { nextContext } from '@angular/core/src/render3';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'editor';
  text:any;
  constructor( public socketService:SocketService){}

  ngOnInit(){
    //this.socketService.connect();
    this.socketService.getText();
    this.socketService.createTextStream
     .subscribe((value) =>{
       console.log('value',value);
       this.text=value;
    });
  }
  updateText = function(){ 
    this.socketService.updateText(this.text);
  }
  // ngOnDestroy(){
  //   this.socketService.createTextStream.unsubscribe()
  // }
}
