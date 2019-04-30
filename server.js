const express=require('express');
const app= express();
const server= require('http').createServer(app);
const io= require('socket.io')(server);
const bp= require('body-parser');
const userRouter = require('./users.router')(io,app);

app.use(express.static(`./views/editor/dist/editor`));
app.use('/',bp.json());
app.use('/',bp.urlencoded({extended:true}));
app.use('/',userRouter);
//app.use(express.static('./views/editor/dist/editor'));
// io.of('/editor')
// .on('connection',(socket)=>{
//     console.log('new connection established');
// });

server.listen(4500,()=>{
    console.log('server listening on port 4500');
});