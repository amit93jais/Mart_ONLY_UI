import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../config/environment';
import { Observable, throwError, of } from 'rxjs';
import { Address } from '../model/address';

@Injectable()
export class AddressService {
    //serviceUrl = environment.backendUrl + '/mart/user';
    orderUrl = environment.backendUrl + '/order.json';

    addressDetails: Address[] = [
        {id : 1, fullName: 'Amit Jaiswal', addressLine1: '520, near bob bank',addressLine2: 'Sector 17 A', landMark: '', city: 'Gurugram', state: 'Haryana', postalCode:'122001', mobileNumber: '741104385',alternateMobileNumber: '',addressType: 'Home', isDefault:true ,userId:101},
        {id : 2, fullName: 'Mohit Tiwari',addressLine1: '523, Sector 18',addressLine2: '', landMark: '',city: 'Gurugram', state: 'Haryana', postalCode:'122001', mobileNumber: '7411046386', alternateMobileNumber: '', addressType: 'Other', isDefault:false,userId:101},
      ];

    constructor(private http: HttpClient) { }

    getAllAddress() : Observable<Address[]> {
        console.log(this.orderUrl)
      //  return this.http.get<Order[]>(this.orderUrl)
      // .pipe( catchError(this.handleError))
        //.subscribe(response => console.log(response));
        return of (this.addressDetails);
      }

      getDefaultAddress(): Observable<Address>{
        return of (this.addressDetails[0]);
      }

      private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };
}
