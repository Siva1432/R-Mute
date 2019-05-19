const express=require('express');
const app= express();
const server= require('http').createServer(app);
const io= require('socket.io')(server);
const bp= require('body-parser');
var cookieParser = require('cookie-parser')
const cors =require('cors');
const userRouter = require('./routes/users.router')(io,app);
const userAuth =require(`./routes/authenticate`)(cors);
const authorisationRouter = require('./routes/authorize')();
app.use(express.static(`./views/editor/dist/editor`));
const setCORSHeaders= function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin',`${req.headers.origin}`);
    res.setHeader('Access-Control-Allow-Credentials',true);
    console.log(`passing route to next handler set acess-control-origin header to `,req.headers.origin);
  next();
}

app.options('*', cors({
    "origin": ['http://localhost:4200/',
                'http://localhost:4500/authenticate/login',
                'http://localhost:4500/authenticate/signup',
                'http://localhost:4500/authenticate/logout'
],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
  }),setCORSHeaders);
app.use(cors({
    "origin": ['http://localhost:4200/'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }),setCORSHeaders);
app.use(cookieParser())
app.use('/',bp.json());
app.use('/',bp.urlencoded({extended:true}));
app.use('/authorize',authorisationRouter);
app.use('/authenticate',userAuth);
app.use('/',userRouter);

//app.use(express.static('./views/editor/dist/editor'));
// io.of('/editor')
// .on('connection',(socket)=>{
//     console.log('new connection established');
// });

let port= process.env.PORT;

server.listen(port||4500,()=>{
    console.log(`server listening on port ${port || 4500}`);
});