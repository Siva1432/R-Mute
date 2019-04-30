const express= require('express');
const router= express.Router();
const path =  require('path');
const uidHelper=require('./uidPool');
let ops =require('./operationServices');

module.exports=function(io, app){
    app.locals.serverCopy='';
    app.locals.serverCounter=0;
    app.locals.idString='';
    app.locals.backup;
    stateProperties={
        serverCopy:app.locals.serverCopy,
        counter:app.locals.serverCounter,
        idString:app.locals.idString
    }
    

    
    io.of('/editor')
    .on('connection',(socket)=>{
        socket.on('getUserParams',()=>{
            for(let uid of uidHelper.uidPool){
                if(uid.allocated==false){
                    console.log(`uid send :`,uid);
                    uidHelper.setAllocated(uid.id,true);
                    let userParams={id:uid.id,counter:stateProperties.counter}
                    socket.emit('getUserParams',userParams);
                    break;
                }
            }
        });
        console.log('new connection in userRouter');
        socket.on('getText',()=>{
            socket.emit('getText',{text:stateProperties.serverCopy,idString:stateProperties.idString});
        });
        socket.on('newOperation',(op)=>{
           let result= ops.perform(op,stateProperties);
           serverCopy=stateProperties
          // console.log(`result of perform operations :`,result,op,stateProperties);
           if(result){
            socket.broadcast.emit('newOp',op);
                    }
                });


        socket.on(`deleteVal`,(id)=>{
            stateProperties=ops.deleteVal(stateProperties,id);
            console.log(`updated stateProperties after delete`,stateProperties);
            socket.broadcast.emit('deleteVal',id);
        })
    });

//console.log('rotuer called');
router.get('/',async(req,res,next)=>{
    let viewsPath=path.join(__dirname,'/views/editor/dist/editor/index.html');
    console.log(`serving index.html in path :${viewsPath}`);
res.sendFile(viewsPath);


});

return router;

}