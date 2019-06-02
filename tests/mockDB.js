const mongoose =require('../databse/dbConnect');
const queue= require('promise-queue');

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


//new q object 

queue.configure(require('vow').Promise);
const q = new queue(1,1);
// const setNewFolderMap=function(name){
//     let folderMap={};
//     folderMap[name]={
//          name:name,
//          folders:{},
//          files:[]
//         };

//     return folderMap;
// }

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
    q.add(()=>{
        console.log(`adding updatedir query`);
      return  FolderModel.findOneAndUpdate(
            {name:'root'},
            {$set:{folders:root}},
            {useFindAndModify:false}
            );
    }).then((res,rej)=>{
        console.log(`got res, rej:`,res,rej);
        if(res){
            let updatedDir=res;

    console.log(`updated dir map`,updatedDir);
        }else{
            console.log(`updatedir failed`,rej);
        }
        
    })
}


const createNewFolder = async function(name,path){
    const root= await FolderModel.findOne({name:'root'});
    let mapTree=getLevel(path,root);
    console.log(`maptree:`,mapTree);
    mapTree.dirMap.folders[name]={
        name:name,
        folders:{},
        files:[]
    };
    console.log('dirmap after loop', mapTree);   
    if(mapTree.root){
        updateFolderRoot(mapTree.root);
    }
};


createRoot();


const paths=[{path:'/',val:'a'},
{path:'/a',val:'b'},
{path:'/a/b',val:'c'}];

let updateFolderAsync =setInterval(()=>{
    console.log(`checking pending promisies`,paths.length,q.getPendingLength());
    if(paths.length>0){
        if(q.getPendingLength()==0){
            createNewFolder(paths[0].val,paths[0].path);
            paths.splice(0,1);
            if(paths.length==0) clearInterval(updateFolderAsync)
        }
    }
},2000);
paths.push({path:'/a',val:'d'});
paths.push({path:'/a/b/c',val:'e'});
//updateFolderAsync();


