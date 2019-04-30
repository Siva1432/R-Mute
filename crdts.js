'use strict';


let text="";
let id;
let eIndex=0;

let genId= function(uid){
    eIndex=eIndex+1;
    id= uid+eIndex;
    console.log("new id :",id);
    return id;
};

let idList={
    liststring:'',
    addIdStr:function(fn){
        
        if(this.liststring.length==0){
            this.liststring=`${fn.id}`;
           // console.log(`listString :${this.liststring}`);
        }else if(fn.id!==''){
            let index=this.liststring.indexOf(fn.nextTo);
             console.log(`index :${index}`);
            if(index >0 && fn.nextTo!==''){
                this.liststring=`${this.liststring.slice(0,index)}${fn.id},${this.liststring.slice(index)}`;
            }else if(index==0  && fn.nextTo!==''){
                this.liststring=`${fn.id},`+this.liststring;
            }
            else{
                this.liststring+=`,${fn.id}`;
               // console.log(`listString :${this.liststring}`);
            }
        }
    },
    addId:function(fn){
        this.addIdStr(fn);
        this[fn.id]={};
        this[fn.id].val=fn.val;
        this[fn.id].nextTo=fn.nextTo;
       // console.log(this[fn.id]);
    },text:'',
    mergeText:function(){
    //    let n='a1';
    //    let text;
    //     let coutner=0;
    //  while(this[n]!== undefined && coutner<20){
    //      console.log('this[n] :',n,this[n]);
    //      text+= this[n].val;
    //      console.log(this[n].nextTo);
    //      if(this[n].nextTo==''){n='a2'}else{
    //         n=this[n].nextTo;
    //      }
    //      coutner++;
    //  }
    this.liststring.split(',').map((id)=>{
      
        if(this[id]!==undefined){
            if(this[id].val!==null){
                this.text+=this[id].val;
            console.log(`listString :${this.text}`);
            }
            
        };
        console.log(`liststr :${this.liststring}`);
    });
     
    }

};

let insert =function(id,val,nextTo){
    return {id:id,val:val,nextTo:nextTo};
};

let deleteId=  function(id){
    idList[id].val=null;
};

let conflict=function(){}
let addId=function(...args){
args.map((fn,index,arry)=>{
    idList.addId(fn);
});
};

addId(insert(genId('a'),'h','a2'),insert(genId('a'),'e','a3'),insert(genId('a'),'L','a6')
,insert(genId('a'),'l','a4'),insert(genId('a'),'l','a5'),insert(genId('a'),'o','a6')
,insert(genId('a'),'!','a1'));
deleteId('a3');deleteId('a1')
addId(insert(genId('a'),'!','a3'),insert(genId('a'),':','a3'),insert(genId('b'),')','a1')
,insert(genId('a'),':','a1'));

idList.mergeText();

