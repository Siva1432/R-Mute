'use strict';

module.exports={
    uidPool:[
    {id:'a',allocated:false},
    {id:'b',allocated:false},
    {id:'c',allocated:false},
    {id:'d',allocated:false},
    {id:'e',allocated:false},
    {id:'f',allocated:false},
    {id:'g',allocated:false},
    {id:'h',allocated:false},
    {id:'i',allocated:false},
],
setAllocated:function(id,status){
this.uidPool.map((uid)=>{
    if(uid.id==id){
        uid.allocated=status;
        console.log(`setAllocated of uid :`,uid)
        
    }
});
}

};