import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "~/environments/environment";


@Injectable({
    providedIn: "root"
})
export class UserService {

    //userDetails: User =   {id:1, firstName : 'Amit', lastName: 'Jaiswal', mobileNumber: '7411046385' ,email: 'user@mart.com', password: null, confirmPassword: null};

    constructor(private http: HttpClient) {
    }

    getProfileDetails(mobileNumber): Observable<User>{
        //return of(this.userDetails);
        return this.http.get<User>(environment.api.user.profile+'/'+mobileNumber)
        .pipe( catchError(this.handleErrors));
      }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
