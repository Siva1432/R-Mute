const mongoose =require('../databse/dbConnect');
const queue= require('promise-queue');


module.exports=function(){

    
const mockFolderSchema= new mongoose.Schema({
    name:{
        type:String,
        minlength:1,
        maxlength:225
    },
    folders:{
        type:mongoose.Schema.Types.Mixed,
        default: {}
    },
    files:[
            {name:{
                type:String,
                minlength:1,
                maxlength:225,
                },
            children:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'files',
                }
            }

    ]
},{minimize:false});

const FolderModel = mongoose.model('folders',mockFolderSchema);
queue.configure(require('vow').Promise);
const q = new queue(3,3);
const createRoot=async function(name){
                
    const rootFolder= await new FolderModel({
        name:"root",
        folders:{}
    }).save();
    console.log(`new folder created `, await rootFolder);
    
}

let getLevel= function(path,root){
    console.log(`check root:`,root);
    let dirMap=root;
    for(let level of path.split('/')){   
        if(level && level!==null){
            dirMap=dirMap.folders[level];
        };
    };
    console.log(`returning dir map:`,dirMap);
    return {dirMap:dirMap,root:root.folders};
};

let updateFolderRoot=async function(root){
    return q.add(()=>{
        console.log(`adding updatedir query`);
       return FolderModel.findOneAndUpdate(
            {name:'root'},
            {$set:{folders:root}},
            {useFindAndModify:false}
            );
    });
}


const createNewNode = async function(name,path,type){
    const root= await FolderModel.findOne({name:'root'});
    let mapTree=getLevel(path,root);
    console.log(`maptree:`,mapTree);
    (type==='folder')?
    mapTree.dirMap.folders[name]={
            name:name,
            folders:{},
            files:[],
            path:path+`/${name}`
            }
            :mapTree.dirMap.files.push(name);
    console.log('dirmap after loop', mapTree);   
    if(mapTree.root){
        const updatedNode = await updateFolderRoot(mapTree.root);
        console.log(`success created new Node`,await updatedNode);
        return updatedNode
    }
};


createRoot();


const paths=[];

let updateNodeAsync =setInterval(async ()=>{
    console.log(`checking pending promisies`,paths.length,q.getPendingLength());
    return new Promise((resolve,reject)=>{
        if(paths.length>0){
            if(q.getPendingLength()==0){
                
               await createNewNode(paths[0].path,paths[0].val,paths[0].type);
                paths.splice(0,1);
                if(paths.length==0) clearInterval(updateNodeAsync)
            }
        }
    })
    
},2000);

const createFolder= function(path,val){
    paths.push({path,val,type:'folder'});
    updateNodeAsync();
};

const createFile = function(path,val){
    paths.push({path,val,type:'file'});
    updateNodeAsync();
}


return {
    createFolder,
    createFile
}


}
