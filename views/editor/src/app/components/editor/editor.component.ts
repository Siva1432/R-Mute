import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';
//import { nextContext } from '@angular/core/src/render3';
import { TextService } from '../../services/text.service';
@Component({
  selector: 'editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  title = 'editor';
  idString:string;
  users:number;
  text:string;
  
  constructor( public socketService:SocketService , public txtss:TextService){}

  ngOnInit(){
    //this.socketService.connect();
    this.socketService.getText();
    this.socketService.emitgetUserParams();
    this.socketService.observeServerText.subscribe();
    this.socketService.getUsers();
    this.socketService.getServerText
    .subscribe((value) =>{
      this.text=value.text;
      this.idString=value.idString;
    });
    this.socketService.newUser.subscribe((val:number)=>{
      console.log(`got new user`,val);
      this.users=val;
    })
      this.txtss.mutateText.subscribe(val =>{
      this.concatText(val);
    });
  };

  concatText=function({val,index,key}):void{ 
    console.log(`got index `,index,val);
    if(key==`d`){
      switch(index){
        case 0:
        this.text=this.text.slice(0);
        default:
        this.text= `${this.text.slice(0,index)}${this.text.slice(index+1)}`
          }
    }else{
      if(index==0){
        this.text= `${val}${this.text}`;
      }else{
        this.text= `${this.text.slice(0,index)}${val}${this.text.slice(index)}`;
      }
    }
    
  }



  updateText = function(event:any,editor:any){ 
    let op:{};
    let fn:string;
    let key:string;
    console.log(`event key:`,event);
     if(event.key==`Enter`){
       key=`\n`
       console.log(`insert line break key:${key}`);
     }else{
       key=event.key
     };
     op={key,index:editor.selectionStart,fn}
         this.txtss.newKey(op);
  };

  deleteVal=function(event:any,editor:any):void{
    console.log(`${event.key}`);
    if(event.key==`Delete` || event.key==`Backspace`){
      console.log(`got ${event.key} event at index ${editor.selectionStart}`);
      this.txtss.deleteValEmit({key:event.key,index:editor.selectionStart,textLength:this.text.length});
    }
  }
  
}
