
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient ) {

   }
//form validation > check valid credentials > 
//assign tokens on headers > submit the credentials to server
   submitLogin = function(credentials){
     this.http.post(`http://localhost:4500/authenticate/login`,credentials).subscribe((val)=>{
       console.log(`got response from server`,val);
     });
   };

   submitSignUp = function(credentials){
    this.http.post(`http://localhost:4500/authenticate/signup`,credentials).subscribe((val)=>{
      console.log(`got response from server`,val);
    });
  };


}
