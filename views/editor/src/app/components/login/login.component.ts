import { Component, OnInit } from '@angular/core';
import { User} from '../user';
import { HttpService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mhs:HttpService) { }

  ngOnInit() {
  }
  

  submitForm =  function(login) {
  
    const credentials = {
      email:login.email.value,
      password:login.password.value
    };
    this.mhs.submitLogin(credentials);
    console.log(`got sign up object:`, credentials);
  };

  logut=function(){
    this.mhs.logout();
  }

}
