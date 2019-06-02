const mongoose=require('./dbConnect');


module.exports=function(){
    const projectSchema= new mongoose.Schema({
        title:{
            type:String,
            minlength:1,
            maxlength:225,
            require:true
        },
        description:{
            type:String,
            minlength:1,
            maxlength:1500
        },
        admin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        collaborations:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }],
        projectTree:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'rootTrees'
        }
    });


    const rootTreesSchema= new mongoose.Schema({
        name:{
            type:String,
            minlength:1,
            maxlength:225,
            required:true,
        },
        folders:{
            type:Map,
        },
        files:[{
            name:{

            },
            type:mongoose.Schema.Types.ObjectId
        }],
        dateCreated:{
            type:Date,
            required:true
        },
        dateModefied:{
            type:Date,
        }

    });
    
    const Project= mongoose.model('projects',projectSchema);
    
    const createNewProject=async function(project,admin){
        try{
            if(project.title){
                let newProject=await new Project({
                    title:project.title,
                    description:project.description,
                    admin:admin,
                    collaborations:[],
                    projectTree:new Map()
                }).save();
                if(await newProject){
                    console.log('new project created',newProject);
                    return newProject._id;
                }
                else{
                    console.log(`got new project undefined`,newProject);
                    return undefined;
                }
            }
        }catch(err){
            console.log(`create new project failed,`,err);
        };
        
    };

    return {
        createNewProject
    }

}
