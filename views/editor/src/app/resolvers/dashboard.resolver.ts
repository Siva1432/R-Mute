import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import {Resolve, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { User } from '../services/UserModel';
import { HttpClient } from '@angular/common/http';
import { Paths } from '../services/paths';


@Injectable ()
export class DashboardResolver implements Resolve<User> {
constructor( private http:HttpClient, private paths:Paths){

}
resolve(
       route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot
       ): Observable<User>|Promise<User>|User {
         return  this.http.get<User>('http://localhost:4500/authorize/getuser',{observe:'body'});
       }



}
