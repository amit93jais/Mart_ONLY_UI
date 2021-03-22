import {
    HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, tap } from "rxjs/operators";
import {StateService} from "../services/state.service";

/**
 * Hide/Show spinnner based on http activity
 * @class SpinnerInterceptor
 * @implements{HttpInterceptor}
 */

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor{

    private httpRequests: HttpRequest<any>[] = [];

    constructor(private stateService: StateService){}

    /**
     * intercept http traffic and loads spinner
     * @override
     * @method
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler){
        this.httpRequests.push(req);
        return next.handle(req).pipe(
            tap(() => {
                if(!this.stateService.state.isLoading){
                    Promise.resolve(null).then(() => this.stateService.setLoading(true));
                }
            }),
            finalize(() => {
                this.removeRequest(req);
            })
        );
    }

    /**
     * Remove http requests from the stack and hide spinner if all requests are completed
     * @param req
     * @memberof SpinnerInterceptor
     */
    private removeRequest(req: HttpRequest<any>) {
        const i = this.httpRequests.indexOf(req);
        if(i>=0){
            this.httpRequests.splice(i,1);
        }
        if(this.httpRequests.length <= 0){
            this.stateService.setLoading(false);
        }
    }
}
