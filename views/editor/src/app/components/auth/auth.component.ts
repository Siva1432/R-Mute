import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  constructor(private mhs:HttpService) { }

  ngOnInit() {
  }
  submitForm =  function(signup) {
  
    const credentials:User = {
      firstname:signup.firstname.value,
      lastname:signup.lastname.value,
      email:signup.email.value,
      password:signup.password.value
    };
    this.mhs.submitSignUp(credentials);
    console.log(`got sign up object:`, credentials);
  }
}
