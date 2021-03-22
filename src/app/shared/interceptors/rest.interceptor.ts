import {
    HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {getString} from "tns-core-modules/application-settings";

@Injectable()
export class RestInterceptor implements HttpInterceptor{

    constructor(){}

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
        const token = getString('token');
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
