import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class SocketService {
 
  socket:any;
  isUpdate:any;
  constructor() {
    let url={local:`http://localhost:4500/editor`,heroku:`'https://rmute.herokuapp.com/editor'`}
    this.socket= io.connect(url.local);
    this.socket.on('connection' , ()=>{
      console.log('io connection established',this.socket.nsp);
    });    
   }
   getServerText = new Subject<{text:string,idString:string}>();
   
   
   observeServerText= new Observable((Observer)=>{
     this.socket.on('getText',(val:{text:string,idString:string})=>{
       console.log("got text properties from server :",val);
       this.getServerText.next(val);
       this.getServerText.complete();
       Observer.complete();
     })
   });
   

   newOp= new Observable<any>((Observer)=>{
     this.socket.on(`newOp`,(op)=>{
       Observer.next(op);
     //  console.log(`got new Op:`,op);
     });
   });
   deleteValListner=new Observable<string>((Observer)=>{
     this.socket.on(`deleteVal`,(id:string)=>{
       Observer.next(id);
       console.log(`got delete value at index::${ id}`);
     });
   }
   );
   
   getUserParams:Observable<any> = new Observable((Observer)=>{
    this.socket.on('getUserParams',function(data:{}){
      Observer.next(data);
      Observer.complete();
    })
   });
   
   deleteVal=function(nextTo:string):void{
    this.socket.emit(`deleteVal`,nextTo);
   };
   emitNewOp = function(op){
      this.socket.emit('newOperation', op );  
  }
  emitgetUserParams=function(){
    this.socket.emit('getUserParams');
  };
  getText=function(){
    this.socket.emit('getText');
  };
   
}
