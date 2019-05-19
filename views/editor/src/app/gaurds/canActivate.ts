import {Injectable,Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { GaurdService } from '../services/gaurd.service';



@Injectable()
export class AuthGaurd implements CanActivate{
    constructor(private injector:Injector,private router:Router){}
    authService = this.injector.get(GaurdService);
 async canActivate(active:ActivatedRouteSnapshot, routerState:RouterStateSnapshot){
    console.log('query params:',active.params);
   try{
      let returnStatus:boolean= await this.authService.authorized();
   
   console.log(`returning status:${returnStatus}`);
   return returnStatus;
   } catch(err){
      console.log(`got error after here`,err);
   }
   
     
}

}