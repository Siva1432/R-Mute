const express= require(`express`);
const router= express.Router();
const authenticate=require(`../userAuth/authentication`)();

module.exports=function(){
    let authorize=function(req,res,next){
        xToken=req.cookie.X-XSRF-TOKEN;
        jwt=req.cookie.SESSIONID
        if( jwt!==undefined && xToken !==undefined ){
            authenticate.validate(jwt,xToken);
        }
    }

    router.post(`/login`,async (req,res,next)=>{
        console.log(`login new user`,req.body);
        let authorized=await authenticate.login(req.body);
        if(authorized.matched){
            const tokens= authenticate.manageUser(authorized.user);
            
            res.cookie(`X-XRSF-TOKEN`,tokens.xsrfToken,{secure:true});
            res.cookie("SESSIONID", tokens.jwtBearerToken, {httpOnly:true, secure:true,expires:0});
            res.status(200).json(tokens.sendUser);
        }else{
            console.log(`authentication failed`,authorized);
        };
    });


    router.post(`/signup`,async (req,res,next)=>{
        console.log(`authenticating new user`,req.body);
        let authorized=await authenticate.signUp(req.body);
        if(authorized.matched){
            const tokens= authenticate.manageUser(authorized.user);
            res.cookie(`X-XRSF-TOKEN`,tokens.xsrfToken,{secure:true});
            res.cookie("SESSIONID", tokens.jwtBearerToken, {httpOnly:true, secure:true});
            res.status(200).send({message:sucessfull});
        }else{
            console.log(`authentication failed`,authorized);
        };
    });
    router.post(`/authorize/logout`,authorize,async (req, res, next)=>{
        if(req.headers.X-XSRF-TOKEN ){
            console.log(`saving the properties before logging out `);
        };
        res.send({message:`success`});
    });

    return router;
}