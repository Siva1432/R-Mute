import {Injectable} from '@angular/core';
import { User } from './UserModel';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Paths } from './paths';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class UserService{
    user:User;
    constructor(private http:HttpClient,private paths:Paths,private router:Router,private cs:CookieService){}
    getUser=new Subject();

    getCurrentUser=function(){
        console.log('getUser end point:',this.paths.endPoints.getUser);
        this.http.post(this.paths.endPoints.getUser).subscribe((res:User)=>{
            console.log(`got response in getUser function :`,res);
            this.user=res;
            this.getUser.next(res);
        })
    };

    logout=function(){
    
        this.http.post(this.paths.endPoints.logOut).subscribe((val:boolean)=>{
          console.log(`got result from logout route`,val);
          this.router.navigate(['/login']);
          console.log('remaining cookies', this.cs.getAll());
          
        });
      };
}