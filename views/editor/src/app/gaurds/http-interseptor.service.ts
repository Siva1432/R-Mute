import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor
  } from '@angular/common/http';;
import {Injectable} from '@angular/core';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

    intercept(req:HttpRequest<any>, next:HttpHandler){
        console.log(`updating req headers`,req);
        let updatedReq=req.clone({withCredentials: true,setHeaders:{
        'Content-Type':'application/json'
        }});
             console.log(`update req headers`,updatedReq);
        return next.handle(updatedReq);
    }
}
