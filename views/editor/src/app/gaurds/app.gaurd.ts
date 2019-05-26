
import { Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../services/UserModel';


@Injectable()
export class AppGaurd implements CanActivate {
    constructor( private cs:CookieService,
                 private router:Router,
                 private http:HttpClient,
                 ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean { 
        const xsrfCookie = this.cs.get('xsrfToken');
        console.log('got xsrfCookie :', xsrfCookie);
        if(xsrfCookie){
        const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    }),observe:'response',
                        withCredentials:'true'
                };
                
            this.http.post('http://localhost:4500/authorize/getuser',httpOptions)
            .subscribe((res:any)=>{
            console.log('got response',res);
            if(res._id){
            this.router.navigate(['/authorized/',res._id],{queryParamsHandling:'merge'});
            }else{

            };
            });

            
        return false;
        }else{
            return true;
        }
       
    }
}
