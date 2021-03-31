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

    constructor(private http: HttpClient) {
    }

    getProfileDetails(mobileNumber): Observable<User>{
        return this.http.get<User>(environment.api.user.profile+'/'+mobileNumber)
        .pipe( catchError(this.handleErrors));
    }

    updateProfile(user): Observable<User>{
        if (!user.mobileNumber) {
            return throwError("Please provide mobile number.");
         }
          return this.http.put<any>(environment.api.user.update, user
           ) .pipe( catchError(this.handleErrors));
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
