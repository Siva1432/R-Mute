import {Injectable,Injector } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlTree } from '@angular/router';
import {Observable} from 'rxjs';
import { NewProjectFormComponent } from '../components/new-project-form/new-project-form.component';



@Injectable()
export class NewProjectFormGaurd implements CanDeactivate<any>{
    constructor(){}
  canDeactivate(
    component:NewProjectFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean>{
    if(component.newProjectForm.dirty){
        console.log(`new project form :`,component.newProjectForm);
        let warn= prompt('You will loose your enterd values. Do you wish to continue');
        if(warn){
            return true;
        }else{
            return false;
        }
    }
  }
     };