import {Injectable,Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { GaurdService } from '../services/gaurd.service';



@Injectable()
export class AuthGaurd implements CanActivate{
    constructor(private injector:Injector,private router:Router){}
    authService = this.injector.get(GaurdService);
 async canActivate(active:ActivatedRouteSnapshot, routerState:RouterStateSnapshot){
   try{
      let returnStatus:boolean= await this.authService.authorized();
      if(returnStatus ==false){
         this.router.navigate(['/login']);
      }
      return returnStatus;
 } catch(err){
   }
   
     
};

}