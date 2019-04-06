const express= require('express');
const router= express.Router();
const path =  require('path');

module.exports=function(io, app){
    app.locals.text='';
    let newtext= app.locals.text;
    io.of('/editor')
    .on('connection',(socket)=>{
        console.log('new connection in userRouter');
        socket.on('getText',()=>{
            socket.emit('getText',newtext);
        });
        socket.on('updateText',(text)=>{
            newtext=text
            socket.broadcast.emit('getText',newtext);
            socket.emit('getText',newtext);
          //  console.log('broadcasting new updated text',newtext);
        });
    });

//console.log('rotuer called');
router.get('/',async(req,res,next)=>{
    console.log('serving index.html in path :',__dirname+'/views/editor/dist/editor/index.html')
res.sendFile(__dirname+'/views/editor/dist/editor/index.html');


});

return router;

}