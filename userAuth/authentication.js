
const AH = require(`../databse/dbHelpers`)();
const njwt= require('njwt');
const secureRandom= require('secure-random');
const authManager=require(`./userAuthManager`);
const RSA_PRIVATE_KEY= require(`../config/config.json`).RSA_PRIVATE_KEY;
const crypto= require(`crypto`);
const config=require('../config/config.json');

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
    const usersessionToken=genToken;
    claims = {
        sub:user._id,
        role:'user',
        sessionToken:usersessionToken
    };
    //let signingKey = secureRandom(256, {type: 'Buffer'});
    console.log('signin key:',config.RSA_PRIVATE_KEY);
    let jwt= njwt.create(claims,Buffer.from(config.RSA_PRIVATE_KEY, 'base64'));
    
    
    authManager[user._id]={xsrfToken:xsrfToken=genToken,
        sessionToken:usersessionToken
    };
    console.log(`authmanager :`,authManager);
    // const send={
    //     id:user._id,
    // };
    return {jwtBearerToken:jwt.compact(), xsrfToken:authManager[user.id].xsrfToken,uid:user._id};   
};

const verifyTokens=async function(tokens){
    try{
    
   var uid;
    
      await njwt.verify(tokens.sessionid,Buffer.from(config.RSA_PRIVATE_KEY, 'base64'),(err,verified)=>{
           if(err) {
               console.log('error in jwt verify',err,userSession.signingKey);
           }
           if(verified) {
               console.log('veriffied',verified.body);
            const userSession = authManager[verified.body.sub];
            if(userSession){
            (userSession.xsrfToken==tokens.xsrfToken &&
             userSession.sessionToken==verified.body.sessionToken)?
             uid =verified.body.sub:console.log('xsrf and session match failed');
            }
            }
       });
       
    }catch(err){
        console.log(err.message);
    };
    console.log(`sending uid after token verification:`,uid);
    return uid
};

const isAuthorized=async (req,res,next)=>{
    console.log(`checking tokens on is valid route`,req.cookies);
    if(req.cookies.sessionid){
        
        const uid= await verifyTokens(req.cookies);
        console.log('verified uid :',uid);
       if (uid){
           res.locals.status=200;
           res.locals.uid=uid;
        }else{
            res.locals.status=400;
        }
    }
    next();
};

const logoutUser=function(id){
    if(authManager[id]){

        delete authManager[id];
    };
};
findUserById=AH.findUserById


return {
    login,
    signUp,
    manageUser,
    verifyTokens,
    isAuthorized,
    logoutUser,
    findUserById
};

};