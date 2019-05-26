import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/UserModel';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-editor-root',
  templateUrl: './editor-root.component.html',
  styleUrls: ['./editor-root.component.css']
})
export class EditorRootComponent implements OnInit {
  user:User;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser();
    this.userService.getUser.subscribe((user:User)=>{
      console.log('got user',user)
      this.user=user;
    });
  };


  
  logout=()=>{
    this.userService.logout();
  };

}
