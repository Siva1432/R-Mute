
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
  getUser= new BehaviorSubject<User>({id:'',firstname:'',lastname:'',email:'',collaborations:[],projects:[]});

  constructor(private http:HttpClient,private router:Router,private cs:CookieService, ) {

   }

   
  submitLogin = function(credentials){
     
     this.http.post(`http://localhost:4500/authenticate/login`,credentials).subscribe((val)=>{
       console.log(`got response from server`,val);
       this.User=val;
       
       this.router.navigate(['/authorized/dashboard',val.id]);
       this.getUser.next(val);
     });
   };

   submitSignUp = function(credentials){
    this.http.post(`http://localhost:4500/authenticate/signup`,credentials).subscribe((val)=>{
      console.log(`got response from server`,val);
      this.User=val;
     
      this.router.navigate(['/authorized/dashboard',val.id]);
      this.getUser.next(val);
    });
  };
  

  logout=function(id:number){
    let returnVal:boolean;
    this.http.post(`http://localhost:4500/authenticate/logout`,{id:id}).subscribe((val:boolean)=>{
      console.log(`got result from logout route`,val);
      this.router.navigate(['/login']);
      console.log('remaining cookies', this.cs.getAll());
      
    });
    

  };



}
