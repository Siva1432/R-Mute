const express= require(`express`);
const router= express.Router();
const authenticate=require(`../userAuth/authentication`)();


module.exports=function(cors){

    router.post(`/login`, async (req,res,next)=>{
        if(req.method=== 'OPTIONS'){
            console.log('call next for OPTIONS preflight access');
            next();
        }
        console.log(`login new user`,req.body);
        let authorized=await authenticate.login(req.body);
        if(authorized.matched){
            const tokens= authenticate.manageUser(authorized.user);
            res.cookie(`xsrfToken`,tokens.xsrfToken,{expires:new Date(Date.now() + 90000),httpOnly:false,secure:false});
            res.cookie("sessionid", tokens.jwtBearerToken,{httpOnly:true,expires:new Date(Date.now() + 90000),secure:false});
           
            res.status(200).send(tokens.uid);
        }else{
            console.log(`authentication failed`,authorized);
            res.status(400).send('authentication failed wrong user name or password');
        };
    },cors);


    router.post(`/signup`,async (req,res,next)=>{
        console.log(`authenticating new user`,req.body);
        let authorized=await authenticate.signUp(req.body);
        if(authorized.matched){
            const tokens= authenticate.manageUser(authorized.user);
            res.cookie(`xsrfToken`,tokens.xsrfToken,{httpOnly:false,expires:new Date(Date.now() + 90000),secure:false});
            res.cookie("sessionid", tokens.jwtBearerToken, {httpOnly:true,expires:new Date(Date.now() + 90000), secure:false});
            res.status(200).send(tokens.uid);
        }else{
            console.log(`authentication failed`,authorized);
            
            res.status(400).send('authentication failed wrong user name or password');
        };
    },cors);


    router.post(`/logout`,authenticate.isAuthorized,(req,res,next)=>{
        console.log(`checking cookies in logout:`,req.cookies);
        if(res.locals.status==200){
            authenticate.logoutUser(res.locals.uid);
            res.clearCookie('xsrfToken').clearCookie('sessionid').status(200).send(true);

        }else{
            res.clearCookie('xsrfToken').clearCookie("sessionid").status(200).send(false);
        }
    },cors);

    return router;
};