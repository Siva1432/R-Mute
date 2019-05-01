import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  userParams:{counter:number,id:string};
  idString:string='';

  constructor(private socketService:SocketService) {
    
    this.socketService.getUserParams.subscribe((val)=>{
      this.userParams= val;
      console.log(`got the UserParams :`,this.userParams);
    });

    this.socketService.getServerText
    .subscribe((value) =>{
      this.idString=value.idString;
      //console.log('IdStr',this.idString);
    });


   };
   findNextTo=function(index:number):any{
     let nextTo:any;
     let idStr=this.idString;
     if(index<=0){
      nextTo=0;
     }else{
      (idStr.length==0)?nextTo=0:nextTo= idStr.split(',')[index-1];
      console.log(`new val at index::${index} nextTo::${nextTo} idStr::${idStr.split(`,`)}`)
    
     }
     
     return nextTo;
   }

   mutateText= new Subject<{val:string,index:number,key:string}>();


   compareId=function(id,next):boolean{
    if(id.length>next.length){
      console.log(`id is greater then next`);
      return true;
      }else if(id.length== next.length){
      if(id>next){
      console.log(`id > next`);
      return true;
      }else{
      console.log(`id < next`);
      return false
      }
      
      }else{
        console.log(`id < next`);
        return false;
      };
   };


   
    
  
  addId=function(op,id ?):any{
    
    if(id==NaN || id==undefined){
      id=op.c+op.id
    }
    let newNextTo:any;
    let idArry:string[]=this.idString.split(`,`);
    console.log(`idArry :${idArry}`);
  if(this.idString.length>0 && op.nextTo!==0){
    for(let i=idArry.indexOf(op.nextTo)+1; i<idArry.length ;i++){
      
      if(this.compareId(id,idArry[i])){
        newNextTo=idArry[i-1];
        console.log(`newNextTo :${id} > ${newNextTo} original nextTo:${op.nextTo}`);
        break;
      };
    };
    };

    if(newNextTo==undefined){
      switch(this.idString.length){
        case 0:
        newNextTo=0;
        break;
        default:
        (op.nextTo==0)?newNextTo=0:newNextTo = idArry[idArry.length-1];
      }
    }
   // console.log(`apending id :${id}`);
    let nextIndex= this.idString.indexOf(newNextTo);
    let n:number=newNextTo.length;
    //console.log( `nextTo:${op.nextTo}    next index: ${nextIndex}  `);
    console.log(`newNextTo :${newNextTo}`);
    switch(newNextTo){
      case 0:
      
      (this.idString.length>=1)? this.idString=`${id},`+this.idString :this.idString=`${id}`;
      break;
      default:
              if(nextIndex>=0){
                this.idString= `${this.idString.slice(0,nextIndex+n)},${id}${this.idString.slice(nextIndex+n)}`;
              }

    };    
    return newNextTo;
  };
  
  newOpeartion=this.socketService.newOp.subscribe((op)=>{
    //console.log(`local counter:${this.userParams.counter} , Op counter:${op.c}`);

    (this.userParams.counter<op.c)?this.userParams.counter=op.c:console.log(`got op coutner less then local`);
    let newNextTo:string=this.addId(op);
    //console.log(`newOp Received val at index:`,index,op,this.idString);
    let index=this.idString.split(`,`).indexOf(newNextTo);
    if(index>=-1){
    const concat={val:op.val,index:index+1,key:'i'}
    this.mutateText.next(concat);
  }
  });


 newKey=function (op):void{
     let operation:{};
    this.userParams.counter++;
    let id=this.userParams.counter+this.userParams.id;
    op.nextTo=this.findNextTo(op.index);
    
    if(op.nextTo!==undefined ){
      this.addId(op,id);
       operation= {id:this.userParams.id,
        c:this.userParams.counter,
        fn:'i',
        val:op.key,
        nextTo:op.nextTo
      };
      
    //console.log('new Op created :',op,op.nextTo);
   this.socketService.emitNewOp(operation);
    }else{
     // console.log(`got next to undefined, event ${op.val} at index${op.index} not updated`);
    }
    
  };




  deleteValEmit=function(fn:{key:string,index:number,textLength:number}):void{
    let nextTo:string;
    let removeNextIndex:number;
    switch(fn.key){
      case `Backspace`:
      removeNextIndex=fn.index;
      (fn.index>=1)?nextTo=this.findNextTo(removeNextIndex):removeNextIndex=undefined;
      break;
      case `Delete`:
      removeNextIndex=fn.index+1;
      (fn.index<fn.textLength)?nextTo=this.findNextTo(removeNextIndex):removeNextIndex=undefined;
      break;
    }

    console.log(`delete val from ${removeNextIndex}`);

    if(removeNextIndex!==undefined && nextTo!==undefined){
       
    let indexOfNextTo=this.idString.indexOf(nextTo);
    let n=nextTo.length;
    let idStr=this.idString;
    switch (indexOfNextTo){
      case 0:
      this.idString=idStr.slice(indexOfNextTo+n+1);
      break;
      default :
      this.idString=idStr.slice(0,indexOfNextTo-1)+idStr.slice(indexOfNextTo+n);
    }
    console.log(`removed id ${nextTo} IndexOfNextTo:${indexOfNextTo} idLength:${n} now idStr:${this.idString} `);

      this.socketService.deleteVal(nextTo);
    }
    
  };


  deleteVal=this.socketService.deleteValListner.subscribe((id:string)=>{
    let index=this.idString.split(`,`).indexOf(id);
    let indexOfNextTo=this.idString.indexOf(id);
    let n=id.length;
    let idStr=this.idString;
    switch(indexOfNextTo){
    case 0:
    this.idString=idStr.slice(id.length+1);
    break;
    default:
    this.idString=idStr.slice(0,indexOfNextTo-1)+idStr.slice(indexOfNextTo+n);
    }
    console.log(`removed id ${indexOfNextTo} idLength:${n}, now idStr:${this.idString} `);
    if(index>=-1){
      const remove={val:"",index,key:'d'};
      this.mutateText.next(remove);
    }

  });
  
 
}