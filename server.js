const express=require('express');
const app= express();
const server= require('http').createServer(app);
const io= require('socket.io')(server);
const bp= require('body-parser');
const cors =require('cors');
const userRouter = require('./routes/users.router')(io,app);
const userAuth =require(`./routes/authorise`)();
app.use(express.static(`./views/editor/dist/editor`));
app.use(cors());
app.use('/',bp.json());
app.use('/',bp.urlencoded({extended:true}));
app.use('/collab',userRouter);
app.use('/authenticate',userAuth);

//app.use(express.static('./views/editor/dist/editor'));
// io.of('/editor')
// .on('connection',(socket)=>{
//     console.log('new connection established');
// });

let port= process.env.PORT;

server.listen(port||4500,()=>{
    console.log(`server listening on port ${port || 4500}`);
});