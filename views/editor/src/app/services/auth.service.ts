
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { User} from './UserModel'
import { of, Subject, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  User:User;
  

  constructor(private http:HttpClient,private router:Router,private cs:CookieService, ) {

   }

   
  submitLogin = function(credentials){
     
     this.http.post(`http://localhost:4500/authenticate/login`,
                      credentials,
                      {observe:'response'})
     .subscribe((res:HttpResponse<any>)=>{
       console.log(`got response from server`,res);
      if(res.status==200){
        this.router.navigate(['/authorized/',res.body],{queryParamsHandling:'merge'});
      }else{
        console.log(`sorry login failed,` ,res);
      }
     });
   };

   submitSignUp = function(credentials){
    this.http.post(`http://localhost:4500/authenticate/signup`,credentials,{observe:'response'})
    .subscribe((res:HttpResponse<any>)=>{
      console.log(`got response from server`,res);
     if(res.status==200){
       this.router.navigate(['/authorized/',res.body],{queryParamsHandling:'merge'});
     }else{
       console.log(`sorry login failed,` ,res);
     }
    });
  };
  



}
