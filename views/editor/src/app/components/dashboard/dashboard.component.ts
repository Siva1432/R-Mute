import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/auth.service';

import {User} from '../../services/UserModel';
import {Subscriber, Subscription} from 'rxjs';
import { GaurdService } from 'src/app/services/gaurd.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user:User;

  constructor(private userService:HttpService,private gaurdService:GaurdService) {

   }
   getUserSubscriber:Subscription;
  ngOnInit() {
     this.getUserSubscriber=this.userService.getUser.subscribe((newUser:User)=>{
      console.log(`updating user`);
      this.user= newUser;
    });
  }
  ngOnDestroy(){
    this.getUserSubscriber.unsubscribe();
  }
  logOut=function(){
    console.log('logging out user');
    this.userService.logout(this.user.id)
  }

};
