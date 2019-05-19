
const AH = require(`../databse/dbHelpers`)();
const njwt= require('njwt');
const secureRandom= require('secure-random');
const authManager=require(`./userAuthManager`);
const RSA_PRIVATE_KEY= require(`../config/config.json`).RSA_PRIVATE_KEY;
const crypto= require(`crypto`);

module.exports=function(){

const signUp=async function(user){
    console.log(`user obj in signup`,user);
    if(await AH.findUserByEmail(user.email)){
        console.log(`user already exists`) ;
        return false;  }
        else{
            let newUser=await AH.addNewUser(user);
            if(newUser && newUser!==null && newUser!==undefined){
                console.log(`signUp Successfull`,newUser);
                return {matched:true,user:newUser};
            }
            else{
                console.log(`signUp failed`,newUser);
                return {matched:false};
            }

        };

};

const login=async function(user){
    let logged=await AH.Authenticate(user);
    if(logged!==null && logged!==undefined){
        console.log(`login successfull`,logged);
        return logged;
    };
};

const genToken = crypto.randomBytes(48).toString('hex');

const manageUser= function(user){
    claims = {
        sub:user._id,
        role:'user',
    };
    let signingKey = secureRandom(256, {type: 'Buffer'})
    let jwt= njwt.create(claims,signingKey);
    
    authManager[user._id]={xsrfToken:xsrfToken=genToken,
        signingKey:signingKey.toString('base64')
    };
    console.log(`authmanager :`,authManager);
    const send={
        id:user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        collaborations:user.collaborations,
        projects:user.projects
    };
    console.log(`sending:`,send);
    return {jwtBearerToken:jwt.compact(), xsrfToken:authManager[user.id].xsrfToken,sendUser:send};   
};

const verifyTokens=async function(tokens, id){
    try{
    const userSession = authManager[id];
   var isValid;
    if(userSession){
      await njwt.verify(tokens.sessionid,Buffer.from(userSession.signingKey, 'base64'),(err,verified)=>{
           if(err) {
               console.log('error in jwt verify',err,userSession.signingKey);
           return false;}
           if(verified) {
             
               
               (userSession.xsrfToken==tokens.xsrfToken)? isValid=true:isValid =false;
               console.log('veriffied',verified.body,isValid);
              
            }
       });
       
    }else{
        return false;
    }}catch(err){
        console.log(err.message);
    };
    console.log(`sending isValid:`,isValid);
    return isValid
};

const isAuthorized=async (req,res,next)=>{
    console.log(`checking tokens on is valid route`,req.cookies,req.body.id);
    if(req.cookies.sessionid){
        
        const verify= await verifyTokens(req.cookies,req.body.id);
        console.log('verify :',verify);
       if (await verify==true){
           res.locals.status=200;
            res.locals.send=true;
        }
        else{
            res.locals.status=400;
            res.locals.send=false;}
        next();
    }
    else{
        res.locals.status=400;
        res.locals.send=false;}
    next();
};

const logoutUser=function(id){
    if(authManager[id]){

        delete authManager[id];
    };
};

return {
    login,
    signUp,
    manageUser,
    verifyTokens,
    isAuthorized,
    logoutUser
}

};