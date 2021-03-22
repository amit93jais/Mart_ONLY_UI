import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "~/environments/environment";


@Injectable({
    providedIn: "root"
})
export class AuthService {

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
        return this.http.post<any>(environment.api.user.create, user
         ) .pipe( catchError(this.handleErrors));
    }

    login(user) {
        return this.http.post<any>(environment.api.user.login,
            user
           /*  JSON.stringify({
                mobileNumber: user.mobileNumber,
                password: user.password
            }), */
         ) .pipe( catchError(this.handleErrors));
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
