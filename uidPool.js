'use strict';

module.exports={
    uidPool:[
    {id:'a',allocated:false,sid:``},
    {id:'b',allocated:false,sid:``},
    {id:'c',allocated:false,sid:``},
    {id:'d',allocated:false,sid:``},
    {id:'e',allocated:false,sid:``},
    {id:'f',allocated:false,sid:``},
    {id:'g',allocated:false,sid:``},
    {id:'h',allocated:false,sid:``},
    {id:'i',allocated:false,sid:``},
],
setAllocated:function(id,status,sid){
this.uidPool.map((uid)=>{
    if(uid.id==id){
        uid.allocated=status;
        uid.sid=sid;
        console.log(`setAllocated of uid :`,uid);
    }
});
},
disconnected:function(sid){
    this.uidPool.map((uid)=>{
        if(uid.sid==sid){
            uid.allocated=false;
            uid.sid=``;
            console.log(`disconnected  sid :`,sid);
        }
    });
}

};