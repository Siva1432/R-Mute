

module.exports={
    
    findIndex:function(id,string){
        return string.indexOf(id);
    },
    backUp:{},

    addFnToBackup:function({id,val,nextTo}){
        (nextTo!==undefined)? this.backUp[id]={
            val:val,
            nextTo:nextTo
        }:console.log(`got next to undefined in addFnToBackUp`);
    },
    compareId:function(id,next){
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
       },

    stringOperations:function(op,stateProperties){
            let id=op.c+op.id;


            this.addFnToBackup(op);         
            let idArry=stateProperties.idString.split(`,`);
            let newNextTo;
            console.log(`idArry :${idArry}`);
            if(stateProperties.idString.length>0  && op.nextTo!==0){

                for(let i=idArry.indexOf(op.nextTo)+1; i<idArry.length ;i++){
                  if(this.compareId(id,idArry[i])){
                    newNextTo=idArry[i-1];
                    break;
                  }
                };
            
            }
                    if(newNextTo==undefined){
                      switch(stateProperties.idString.length){
                        case 0:
                        newNextTo=0;
                        break;
                        default:
                        (op.nextTo==0)?newNextTo=0:newNextTo = idArry[idArry.length-1];
                      }
                    }
   // console.log(`apending id :${id}`);
    let nextIndex= stateProperties.idString.indexOf(newNextTo);
    let n=newNextTo.length;
    //console.log( `nextTo:${op.nextTo}    next index: ${nextIndex}  `);
    switch(newNextTo){
      case undefined:
     // console.log(`cant add undefined to Idstring`);
      break;
      case 0:
      (stateProperties.idString.length>=1)? stateProperties.idString=`${id},`+stateProperties.idString :stateProperties.idString=`${id}`;
      break;
      default:
              if(nextIndex>=0){
                stateProperties.idString= `${stateProperties.idString.slice(0,nextIndex+n)},${id}${stateProperties.idString.slice(nextIndex+n)}`;
              }

    } 
          let valIndex=this.findValId(stateProperties.idString,id);
          switch(valIndex){
              case 0:
              stateProperties.serverCopy=`${op.val}${stateProperties.serverCopy}`;
               break;
              default:
              stateProperties.serverCopy=
               `${stateProperties.serverCopy.slice(0,valIndex)}${op.val}${stateProperties.serverCopy.slice(valIndex)}`;
              break;
            }
             (stateProperties.counter<op.c)? stateProperties.counter=op.c :stateProperties.counter;       
                return stateProperties;
        
       
    },
    
    checkCoutner:function(id,nc,idString){
        let previous=id+(nc-1);
       let index= this.findIndex(previous,idString);
       console.log(`previous counter index :${index}`);
       if(index  > 0 |idString.length==0){
        return true;
       }else{
           return false;
       }
    },
    findValId:function(idString,id){
       return idString.split(`,`).indexOf(id);
    },
    perform:function(op,stateProperties){
        if(op.fn=='i'){
        let performOp=this.stringOperations(op,stateProperties);
        if(performOp){
            //console.log(`updated State properties :`,stateProperties,this.backUp);
            return stateProperties;
                }else{
                    console.log(`missing previous op adding to awaiting `);
                }
        }
     },
     deleteVal:function(stateProperties,id){
         let idStr= stateProperties.idString;
         let text=stateProperties.serverCopy;
         let idIndex=idStr.split(`,`).indexOf(id);
         let stringIndex=idStr.indexOf(id);
         switch(idIndex){
             case 0:
             idStr=idStr.slice(id.length+1);
             text=text.slice(1);
             break;
             default:
             idStr=idStr.slice(0,stringIndex-1)+idStr.slice(stringIndex+id.length);
             text=text.slice(0,idIndex)+text.slice(idIndex+1);
         };
         console.log(`delete id:${id} at index:${stringIndex} updated idStr:${idStr} and text:${text}`);
         stateProperties.idString=idStr;
         stateProperties.serverCopy=text
         return stateProperties;
     }
};
