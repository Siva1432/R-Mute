const express= require(`express`);
const router=express.Router();
const authHelper= require(`../userAuth/authentication`)();
module.exports=function(){
    
    router.post('/isvalid',authHelper.isAuthorized,(req,res,next)=>{
        console.log(`res.locals :`,res.locals);
        if(res.locals.status==200){
            res.send(true);
        }else{
            res.send(false);
        }
    });
    router.get('/getuser',authHelper.isAuthorized,async (req,res,next)=>{
        console.log(`res.locals in getuser route`,res.locals)
        if(res.locals.uid && res.locals.status==200){
            const user=await authHelper.findUserById(res.locals.uid);
            if(await user){
                console.log(`got user:`,user);
                res.status(200).send(user);
            }
        }
    });
    
    return router;
}