import {Injectable}  from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Paths} from'./paths';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class GaurdService {


constructor(private http:HttpClient,
            private paths:Paths,
            private cs:CookieService,
            private router:Router,
            private route:ActivatedRoute
             ){  
            
             };
    
    authorized=function() : Promise<boolean> {
       // (id && id!=='.:id')?console.log('got id:',id):id=this.user._id;
        try{
        let xsrfCookies= this.cs.getAll();
        console.log(`xsrf-token :`,xsrfCookies); 
        const http:HttpClient= this.http;
        const paths=this.paths;
            
 return new Promise<boolean>(function(resolve,reject){
 http.post(paths.endPoints.isValid,{observe:'response'})
 .subscribe((res:HttpResponse<boolean>)=>{
                    console.log(`got is valid res`, res);
                    if(res){
                        resolve(true);
                       }else{
                           resolve(false);
                       }
                });
                });
        }catch(err){
            console.log(`error :`,err);
        };

 };


}