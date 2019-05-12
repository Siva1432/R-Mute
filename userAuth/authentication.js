
const AH = require(`./dbHelpers`)();
const jwt= require('jsonwebtoken');
const authManager=require(`../userAuth/userAuthManager`);
const RSA_PRIVATE_KEY= require(`../config/config.json`).RSA_PRIVATE_KEY;
const crypto= require(`crypto`);

module.exports=function(){

const signUp=async function(user){
    if(await AH.findUserByEmail(user.email)){
        console.log(`user already exists`) ;
        return false;  }else{
            let newUser=await AH.addNewUser(user);
            if(newUser && newUser!==null && newUser!==undefined){
                console.log(`signUp Successfull`,newUser);
                return newUser;
            }else{
                console.log(`signUp failed`,newUser);
                return false;
            }

        };

};

const login=async function(user){
    let logged= AH.Authenticate(user);
    if(user!==null && user!==undefined){
        console.log(`login successfull`,logged);
        return logged;
    };
};

const genToken = crypto.randomBytes(48).toString('hex');

const manageUser= function(user){
    const jwtBearerToken = jwt.sign({
        id:user._id
     }, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: new Date(Date.now()+900000),
        subject: userId
    });
    user.xsrfToken=genToken;
    authManager[user._id]=user;
    return {jwtBearerToken, xsrfToken:user.xsrfToken};   
};




return {
    login,
    signUp,
    manageUser
}

};