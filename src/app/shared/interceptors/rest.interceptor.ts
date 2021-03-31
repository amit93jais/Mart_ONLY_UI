import {
    HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StateService } from "../services/state.service";

@Injectable()
export class RestInterceptor implements HttpInterceptor{

    constructor(private stateService: StateService){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ):Observable<HttpEvent<any>>{

        let customRequest = req;

        if(req.url.includes("/authenticate") || req.url.includes("/isMobileRegistered")
        || req.url.includes("/user/create")){
            customRequest = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            })
        }else{
       const token = this.stateService.getAuthToken();
        console.log("Token in interceptor: "+token);
        customRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
        return next.handle(customRequest)
    }
}
