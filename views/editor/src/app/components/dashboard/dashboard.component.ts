import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/auth.service';

import {User} from '../../services/UserModel';
import { Subscription} from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user:User;

  constructor(private route:ActivatedRoute) {

   }
   getUserSubscriber:Subscription;
  ngOnInit() {
    //  this.getUserSubscriber=this.userService.getUser.subscribe((newUser:User)=>{
    //   console.log(`updating user`);
    //   this.user= newUser;
    // });
    this.route.data.subscribe(data=>{
      console.log(`got user from resolver in dashboard`,data);
      this.user=data.user;
    });

  }
  ngOnDestroy(){
    this.getUserSubscriber.unsubscribe();
  }

};
