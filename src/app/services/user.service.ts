import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { Config } from "../config/config";


@Injectable()
export class UserService {

    userDetails: User =   {id:1, firstName : 'Amit', lastName: 'Jaiswal', mobileNumber: '7411046385' ,email: 'user@mart.com', password: null, confirmPassword: null};
    constructor(private http: HttpClient) { }

    register(user: User) {
        //if (!user.email || !user.password) {
            //This is coming as a notification
          //  return throwError("Please provide both an email address and password.");
       // }
       console.log("Successfully Registered");

        return this.http.post(
            Config.apiUrl + "user/" + Config.appKey,
            JSON.stringify({
                username: user.email,
                email: user.email,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            catchError(this.handleErrors)
        );
    }

    login(user: User) {
        return this.http.post(
            Config.apiUrl + "user/" + Config.appKey + "/login",
            JSON.stringify({
                username: user.email,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            map(response => response),
            tap(data => {
                Config.token = (<any>data)._kmd.authtoken
            }),
            catchError(this.handleErrors)
        );
    }

    getProfileDetails(): Observable<User>{
      return of(this.userDetails);
    }

    getCommonHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": Config.authHeader
        }
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
