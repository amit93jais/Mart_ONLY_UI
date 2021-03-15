import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { environment } from "../config/environment";


@Injectable({
    providedIn: "root"
})
export class UserService {

    userDetails: User =   {id:1, firstName : 'Amit', lastName: 'Jaiswal', mobileNumber: '7411046385' ,email: 'user@mart.com', password: null, confirmPassword: null};

    constructor(private http: HttpClient) {
    }

    isMobileNumberAlreadyRegistered(mobileNumber): Observable<boolean> {
        if (!mobileNumber) {
            return throwError("Please Enter mobile number.");
         }
         return this.http.get<boolean>(environment.api.user.isMobileRegistered+'/'+mobileNumber)
         .pipe( catchError(this.handleErrors));
    }


    register(user) {
        if (!user.mobileNumber || !user.password) {
          return throwError("Please provide both an email address and password.");
       }
        return this.http.post<any>(environment.api.user.create, user,
            { headers: this.getCommonHeaders() }

         ) .pipe( catchError(this.handleErrors));
    }


    getProfileDetails(mobileNumber): Observable<User>{
        //return of(this.userDetails);
        return this.http.get<User>(environment.api.user.profile+'/'+mobileNumber)
        .pipe( catchError(this.handleErrors));
      }

      getCommonHeaders() {
          return {
              "Content-Type": "application/json",
             // "Authorization": Config.authHeader
          }
      }

    login(user: User) {
        return this.http.post<any>(environment.api.user.login,
            JSON.stringify({
                mobileNumber: user.mobileNumber,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }

         ) .pipe( catchError(this.handleErrors));
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
