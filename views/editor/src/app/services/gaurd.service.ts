import {Injectable, OnInit, Injector, OnDestroy }  from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest,HttpEvent, HttpResponse} from '@angular/common/http';
import {Paths} from'./paths';
import {Subscription} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './auth.service';
import {User}from '../services/UserModel';
import { Router, Params,ActivatedRoute } from '@angular/router';
@Injectable()
export class GaurdService implements  OnDestroy{

user:User;
constructor(private http:HttpClient,
            private paths:Paths,
            private cs:CookieService,
            private router:Router,
            private injector:Injector,
            private route:ActivatedRoute
             ){  
             };
             authService=this.injector.get(HttpService);

userSubscription:Subscription=this.authService.getUser.subscribe((newUser:User)=>{
                console.log(`updating user`,newUser);
                this.user=newUser;
            });

ngOnDestroy(){
    this.userSubscription.unsubscribe();
}


    authorized=function() : Promise<boolean> {
        try{
        let xsrfCookies= this.cs.getAll();
        console.log(`xsrf-token :`,xsrfCookies); 
        const http:HttpClient= this.http;
        const paths=this.paths;
        const router:Router=this.router;
            const id:number=this.user.id;
            return new Promise<boolean>(function(resolve,reject){
                if(id){
                    console.log(`got error in here`);
                    console.log('User id :',id);
                 http.post(paths.endPoints.isValid,{id:id}).subscribe((res:boolean)=>{
                    console.log(`got is valid res`, res);
                    if(res){
                        resolve(res);
                       }else{
                           resolve(res);
                       }
                });
                    }else{
                        
                        resolve(false);
                        console.log(`got error at here in reject`);
                    };
                })
        }catch(err){
            console.log(`error :`,err);
        }

 };


}