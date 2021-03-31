import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError, timer } from "rxjs";
import { catchError, finalize, mergeMap, retryWhen } from "rxjs/operators";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    modalOpened: boolean;

    /**
     * Custom Staggered Retry Strategy
     *
     * @method
     * @Param {number} maxRetryAttempts Number of retry attempts
     * @Param {number} scallingDuration wait time factor between retries
     * @param {number[]} excludedStatusCodes Http error codes to be exclude for retry
     * @memberof HttpInterceptor
     */

    genericRetryStrategy =({
        maxRetryAttempts = 3,
        scallingDuration = 1000,
        excludedStatusCodes = []
    }: {
        maxRetryAttempts?: number,
        scallingDuration?: number,
        excludedStatusCodes?: number[];
    } = {}) =>(attempts: Observable<any>) => {
        return attempts.pipe(
            mergeMap((error, i) =>{
                const retryAttempt = i + 1;
                if(
                    retryAttempt > maxRetryAttempts ||
                    excludedStatusCodes.includes(+error.status)
                ){
                    return throwError(error);
                }
                // retry after 1s, 2s etc...
                return timer(retryAttempt * scallingDuration);
            }),
            finalize(() => {})
        );
    };

    constructor(
        //private modalService: NgbModal,
        //private location: Location,
        private router: Router
    ){}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            retryWhen(
                this.genericRetryStrategy({
                    scallingDuration: 100,
                    excludedStatusCodes: [0, 500, 401, 403, 400, 409]
                })
            ),
            catchError((error: HttpErrorResponse) =>{
                switch(error.status) {
                    case 409:
                    case 400:
                        break;
                    case 401:
                        alert("It seems you have not registered with us, To continue please register with us");
                       // this.router.navigate(["/auth", "signup"]);
                        break;
                        /* if(!this.modalOpened){
                          this.modalOpened = true;
                          this.modalService
                          .open(SessionExpireErrorModalComponent,{
                              backdropClass: "back-drop",
                              centered: true,
                              backdrop: "static"
                          })
                          .result.then(result =>{
                              this.modalOpened = false;
                              window.open(window.location.href, "_self");
                          })
                          .catch(reason =>{
                              this.modalOpened = false;
                          })
                      } */
                      break;
                      case 403:
                          this.router.navigate(["/unauthorized"]);
                          break;
                      case 404:
                        alert("Please Check your network connection");
                        break;
                      case 500:
                        alert("We are facing some techinal issue, please try after sometime");
                       // alert(error.message);
                          /* if(!this.modalOpened){
                              this.modalOpened = true;
                              this.modalService
                              .open(ServerErrorModalComponent, {
                                  backdropClass: "back-drop",
                                  centered: true,
                                  backdrop: "static"
                              })
                              .result.then(result =>{
                                  this.modalOpened = false;
                                  window.open(window.location.href, "_self");
                              })
                              .catch(reason =>{
                                  this.modalOpened = false;
                              })
                          } */
                          break;
                          case 401:
                            alert(error.message);
                             /*  if(!this.modalOpened){
                                  this.modalOpened = true;
                                  this.modalService
                                  .open(SessionExpireModalComponent, {
                                    backdropClass: "back-drop",
                                    centered: true,
                                    backdrop: "static"
                                })
                                .result.then(result =>{
                                    this.modalOpened = false;
                                    window.open(window.location.href, "_self");
                                })
                                .catch(reason =>{
                                    this.modalOpened = false;
                                })
                              } */
                              break;

                        case 0:
                           default:
                            break;
                }
                return throwError(error);
            })
        );
    }
}
