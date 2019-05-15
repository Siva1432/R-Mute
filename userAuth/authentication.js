
const AH = require(`../databse/dbHelpers`)();
const njwt= require('njwt');
const secureRandom= require('secure-random');
const authManager=require(`../userAuth/userAuthManager`);
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
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        collaborations:user.collaborations,
        projects:user.projects
    };
    console.log(`sending:`,send);
    return {jwtBearerToken:jwt.compact(), xsrfToken:authManager[user.id].xsrfToken,sendUser:send};   
};

return {
    login,
    signUp,
    manageUser
}

};