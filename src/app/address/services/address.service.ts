import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Address } from '../models/address';
import { environment } from '~/environments/environment';
import { StateService } from '~/app/shared/services/state.service';

@Injectable({
    providedIn: "root"
})
export class AddressService {

    addressDetails: Address[] = [
        {id : 1, fullName: 'Amit Jaiswal', addressLine1: '520, near bob bank',addressLine2: 'Sector 17 A', landMark: '', city: 'Gurugram', state: 'Haryana', postalCode:'122001', mobileNumber: '741104385',alternateMobileNumber: '',addressType: 'Home', isDefault:true ,userId:101},
        {id : 2, fullName: 'Mohit Tiwari',addressLine1: '523, Sector 18',addressLine2: '', landMark: '',city: 'Gurugram', state: 'Haryana', postalCode:'122001', mobileNumber: '7411046386', alternateMobileNumber: '', addressType: 'Other', isDefault:false,userId:101},
      ];

    constructor(private http: HttpClient, private stateService: StateService) {}

    getAllAddress() : Observable<Address[]> {
        return this.http.get<Address[]>(environment.api.address.all,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString()
              },
        });
    }

    getDefaultAddress(): Observable<Address>{
        return this.http.get<Address>(environment.api.address.default,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString()
              },
        });
       // return of (this.addressDetails[0]);
    }

    changeDefaultAddress(addressId){
        return this.http.get<any>(environment.api.address.default + "/"+ addressId,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString()
              },
        });
    }

    addNewAddress(address) {
        return this.http.post<any>(environment.api.address.create, address, {
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString()
              },
        });
    }

    updateAddress(address) {
        return this.http.put<any>(environment.api.address.update, address, {
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString()
              },
        });
    }

    removeAddress(addressId){
        return this.http.delete<any>(environment.api.address.remove + "/"+ addressId);
    }

}
