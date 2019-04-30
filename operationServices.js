

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

    stringOperations:function(fn,stateProperties){
            let id=fn.c+fn.id;
            stateProperties.id=id;
            this.addFnToBackup(fn);          

            if(fn.nextTo==undefined){
                console.log(`got next to undefined returning the value to the client `);
            }else if(fn.nextTo==0){
                (stateProperties.idString.length>1)? stateProperties.idString=`${id},${stateProperties.idString}` :stateProperties.idString=`${id}`;
            }
            else{
                let nextIndex=this.findIndex(fn.nextTo,stateProperties.idString);
                    let n=fn.nextTo.length;
                     console.log(`index :${nextIndex}`);
                      if(nextIndex>=0){
                    stateProperties.idString= `${stateProperties.idString.slice(0,nextIndex+n)},${id}${stateProperties.idString.slice(nextIndex+n)}`;
                                    }
                                }
          let valIndex=this.findValId(stateProperties.idString,id);
          switch(valIndex){
              case 0:
              stateProperties.serverCopy=`${fn.val}${stateProperties.serverCopy}`;
               break;
              default:
              stateProperties.serverCopy=
               `${stateProperties.serverCopy.slice(0,valIndex)}${fn.val}${stateProperties.serverCopy.slice(valIndex)}`;
              break;
            }
             (stateProperties.counter<fn.c)? stateProperties.counter=fn.c :stateProperties.counter;       
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
