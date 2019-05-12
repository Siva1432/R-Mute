const express= require(`express`);
const router= express.Router();
const authenticate=require(`../userAuth/authentication`)();

module.exports=function(){
    router.post(`/authorize/login`,async (req,res,next)=>{
        let authorized=await authenticate.login(req.body.user);
        if(authorized.matched){
            const tokens= authenticate.manageUser(authorized.user);
            res.cookie(`X-XRSF-TOKEN`,tokens.xsrfToken,{secure:true});
            res.cookie("SESSIONID", tokens.jwtBearerToken, {httpOnly:true, secure:true});
        }else{
            console.log(`authentication failed`,authorized);
        };
    });


    router.post(`/authorize/signup`,async (req,res,next)=>{
        let authorized=await authenticate.signUp(req.body.user);
        if(authorized.matched){
            const tokens= authenticate.manageUser(authorized.user);
            res.cookie(`X-XRSF-TOKEN`,tokens.xsrfToken,{secure:true});
            res.cookie("SESSIONID", tokens.jwtBearerToken, {httpOnly:true, secure:true});
        }else{
            console.log(`authentication failed`,authorized);
        };
    });
    router.post(`/authorize/logout`,async (req, res, next)=>{
        if(req.saveProperties){
            console.log(`saving the properties before logging out `);
        };
        res.send({message:`success`});
    });

    return router;
}