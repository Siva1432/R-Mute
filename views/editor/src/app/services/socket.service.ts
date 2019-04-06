import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable,Observer,Subject,fromEvent } from 'rxjs';
import { text } from '@angular/core/src/render3';





@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:any;
  isUpdate:any;
  constructor() {
    this.socket= io.connect('http://localhost:4500/editor');
    this.socket.on('connection' , ()=>{
      console.log('io connection established',this.socket.nsp);
    });    
   }
   createTextStream = new Observable((obs)=>{
     this.socket.on('getText',(text)=>{
     //  console.log("calling text in next ");
       obs.next(text);
     })
   });
   
  
  updateText = function(text){
      this.socket.emit('updateText', text );  
  }

  getText=function(){
    this.socket.emit('getText');
  }
   
}
