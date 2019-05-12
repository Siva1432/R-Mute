const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const saltRounds= require(`../config/config.json`).saltRounds;
module.exports=function(){

    const userSchema= new mongoose.Schema({
        firstName:{
            type:String,
            minlength:1,
            maxlength:225,
            required:true
        },
        lastname:{
            type:String,
            minlength:1,
            maxlength:225,
            required:true
        },
        password:{
            type:String,
            minlength:1,
            required:true,
            maxlength:1000,
            required:true
        },
        email:{
            type:String,
            minlength:1,
            maxlength:225,
            required:true,
            unique:true
        },
        projects:{
            type:mongoose.Schema.Types.ObjectId,
            ref:`projects`,
        },
        role:{
            type:String,
            minlength:1,
            maxlength:225,
            required:true
        },
        collaborations:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:`users`,
            },
        ]
        
    });
    
    const userModel= mongoose.model(`users`,userSchema);
   const findUserByEmail= async function(email){

        return await userModel.findOne({email:email});
    };

//add new user to db
   const addNewUser=async (user)=>{
       try{
        const newUser= await new userModel({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            password: await bcrypt.hash(user.password, saltRounds),
            projects:{},
            collaborations:[],
            role:user.role
        }).save();
        if(newUser){
            console.log(`new user created :`,newUser);
            return newUser;
        }
        else{
         console.log(`failed creating new user  :`,newUser);
         return false;
        }
 

       } catch(err){
        console.log(`error creating new user :`,err);
        return false;
       };
          };

//Authenticate new User;
    const Authenticate=async function(user){
        let found= await this.findUserByEmail(user.email);
        let matched=false;
       if(found!==null && found!==undefined){ 
           matched= await bcrypt.compare(user.password,found.password)
            }
            else{ console.log(`sorry credentials didnt match,${matched}`)};
        return {matched:matched, user:found};
    };
return {
    findUserByEmail,
    addNewUser,
    Authenticate
}

};