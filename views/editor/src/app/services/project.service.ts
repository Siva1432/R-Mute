import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paths } from './paths';

@Injectable()
export class ProjectService{

    constructor(private http: HttpClient,private paths:Paths){}

    createNewProject=function(project:{title:string, description?:string}):void{
        if(project.title!==''){
            console.log('creating new project');
       this.http.post(this.paths.endPoints.createNewProject,project,{observe:'body'}).subscribe((projectId:string | number)=>{
           console.log('got project id',projectId);
       })

        }
        
        
    }
}