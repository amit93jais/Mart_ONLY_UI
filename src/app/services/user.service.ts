import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { environment } from "../config/environment";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
    })
  };


@Injectable()
export class UserService {
    serviceUrl = environment.backendUrl+'/user';

    userDetails: User =   {id:1, firstName : 'Amit', lastName: 'Jaiswal', mobileNumber: '7411046385' ,email: 'user@mart.com', password: null, confirmPassword: null};

    constructor(private http: HttpClient) {
    }

    isMobileNumberAlreadyRegistered(mobileNumber): Observable<boolean> {
        if (!mobileNumber) {
            return throwError("Please Enter mobile number.");
         }
         return this.http.get<boolean>(this.serviceUrl+'/isMobileRegistered/'+mobileNumber)
         .pipe( catchError(this.handleErrors));
    }


    register(user) {
        if (!user.mobileNumber || !user.password) {
          return throwError("Please provide both an email address and password.");
       }
        return this.http.post<any>(this.serviceUrl + '/create', user,
            { headers: this.getCommonHeaders() }

         ) .pipe( catchError(this.handleErrors));
    }


    getProfileDetails(): Observable<User>{
        return of(this.userDetails);
      }

      getCommonHeaders() {
          return {
              "Content-Type": "application/json",
             // "Authorization": Config.authHeader
          }
      }

    login(user: User) {
        return this.http.post<any>(this.serviceUrl + '/authenticate',
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
