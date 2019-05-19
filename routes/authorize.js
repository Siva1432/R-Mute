const express= require(`express`);
const router=express.Router();
const authHelper= require(`../userAuth/authentication`)();
module.exports=function(){
    
    router.post('/isvalid',authHelper.isAuthorized,(req,res,next)=>{
        if(res.locals.status==200){
            res.status(200).send(true);
        }else{
            res.status(400).send(false);
        }
    });
    
    return router;
}