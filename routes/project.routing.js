const router= require('express').Router();
const authorize= require('../userAuth/authentication')();
const helper=require('../databse/project.helper')();

module.exports=function(){
router.post('/new',authorize.isAuthorized,async (req,res,next)=>{
    console.log('creating new project ',req.body);
    if(res.locals.status==200){
        const projectId=await helper.createNewProject(req.body,res.locals.uid);
        if(projectId){
            console.log(`creating new project successfull, sending project id:`,projectId);
            res.status(200).send(projectId);
        }


    }
    else{
        res.status(400).send({message:'sorry doesnt have authorization to create new project'});
    }
  
});
return router;
}