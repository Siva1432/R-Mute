let Folder= function(name, files, folders) {
    this.name = name;
    this.files = files;
    this.folders=folders
  }
  
  let root= new Folder('R-Mute',[],{});
  
  let addFiles= function(name,path){
      let dir=root;
    for(let level of path.split('/')){
    if(level){
    dir=dir.folders[level];
    }
    }
    //console.log(`dir obj:`,dir);
    dir.files.push(name);
  }
  
  let addFolder=function(name,path){
  let dir=root;
    for(let level of path.split('/')){
    if(level){
    dir=dir.folders[level];
    }
   }
   //console.log(`dir obj:`,dir);
    dir.folders[name]=new Folder(name,[],{})
    
  }
  
  addFiles('server.js','/' );
  
  let folderpath='views/editor/src/app';
  let passingPath='';
  /* for(let level of folderpath.split('/')){
  addFolder(level,passingPath);
  passingPath+=`/${level}`;
  } */
  
  addFolder('views','/');
  addFolder('editor','/');
  addFolder('src','/');
  addFolder('app','/views');
  
  console.log(root);
  

  let Folder= function(name, files, folders) {
    this.name = name;
    this.files = files;
    this.folders=folders
  }
  
  let root= new Folder('R-Mute',[],{});
  
  let addFiles= function(name,path){
      let dir=root;
    for(let level of path.split('/')){
    if(level){
    dir=dir.folders[level];
    }
    }
    //console.log(`dir obj:`,dir);
    dir.files.push(name);
  }
  
  let addFolder=function(name,path){
  let dir=root;
    for(let level of path.split('/')){
    if(level){
    dir=dir.folders[level];
    }
   }
   //console.log(`dir obj:`,dir);
    dir.folders[name]=new Folder(name,[],{})
    
  }
  
  addFiles('server.js','/' );
  
  let folderpath='views/editor/src/app';
  let passingPath='';
  /* for(let level of folderpath.split('/')){
  addFolder(level,passingPath);
  passingPath+=`/${level}`;
  } */
  
  addFolder('views','/');
  addFolder('editor','/');
  addFolder('src','/');
  addFolder('app','/views');
  
  console.log(root);
  
  const renameFolder= function(newname,path,name){
  let dir=root;
    for(let level of path.split('/')){
    if(level){
    dir=dir.folders[level];
    }
   };
   
   dir.folders[newname]=dir.folders[name];
   dir.folders[newname].name=newname;
   delete dir.folders[name];
  }
  const deleteFolder= function(path,name){
  let dir=root;
    for(let level of path.split('/')){
    if(level){
    dir=dir.folders[level];
    }
   };
   delete dir.folders[name];
  }
  
  renameFolder('myapp','/views','app')
  deleteFolder('/views','myapp')
  console.log(root);