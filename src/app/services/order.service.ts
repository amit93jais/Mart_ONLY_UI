import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Order } from '../model/order';
import { Address } from '../model/address';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../config/environment';
import { Observable, throwError, of } from 'rxjs';
import { Payment } from '../model/payment';
import { Product } from '../model/product';
import { OItem } from '../model/o-Item';

@Injectable(
//    {providedIn: 'root'}
)
export class OrderService {
    //serviceUrl = environment.backendUrl + '/mart/user';
    orderUrl = environment.backendUrl + '/order.json';

    address: Address =   {id : 1, fullName: 'Amit Jaiswal', addressLine1: '520, near bob bank',addressLine2: 'Sector 17 A', landMark: '', city: 'Gurugram', state: 'Haryana', postalCode:'122001', mobileNumber: '741104385',alternateMobileNumber: '', userId:101};
    payment: Payment = {id: 1, invoiceNumber: 'MGUI-116535589-150420', paymentOption: 'Cash', subTotal: 1232.15, deliveryCharge: 30, walletCredit:34, discount:40, total:1197}
    items: OItem[] = [
        {id:1, name:'Potato', imageUrl:'~/images/products/potato.jpg', category:'', weight:'1 kg', price:32,  quantity:2},
        {id:2, name:'Lemon', imageUrl:'~/images/products/lemon.jpg', category:'', weight:'250 g', price:25, quantity:1.05},
        {id:3, name:'Onion', imageUrl:'~/images/products/onion.jpg', category:'', weight:'1 kg',price:40, quantity:3},
        {id:4, name:'Tomato', imageUrl:'~/images/products/tomato.jpg', category:'', weight:'1 kg',price:60, quantity:2},
    ]
    orderDetails: Order[] = [
        {id : 1, orderId: 'DX-MGMU-118335-290420',orderDate: new Date(2020, 6, 17), orderStatus: 'On the way', total: 2365.00, noOfItmes: 10, payment: this.payment, address: this.address, items: this.items},
        {id : 2, orderId: 'DX-MGMU-118335-290420', orderDate: new Date(2019, 7, 7), orderStatus: 'Cancelled', total: 2365.00, noOfItmes: 13, payment: this.payment, address: this.address, items: this.items},
        {id : 3, orderId: 'DX-MGMU-118335-290420',orderDate: new Date(2020, 6, 17), orderStatus: 'Delivered', total: 2365.00, noOfItmes: 10, payment: this.payment, address: this.address, items: this.items},
        {id : 4, orderId: 'DX-MGMU-118335-290420', orderDate: new Date(2019, 7, 7), orderStatus: 'Cancelled', total: 2365.00, noOfItmes: 13, payment: this.payment, address: this.address, items: this.items},
        {id : 5, orderId: 'DX-MGMU-118335-290420',orderDate: new Date(2020, 6, 17), orderStatus: 'Dispatched', total: 2365.00, noOfItmes: 10, payment: this.payment, address: this.address, items: this.items}
      ];

    constructor(private http: HttpClient) { }

    getAllOrders() : Observable<Order[]> {
        //console.log(this.orderUrl)
      //  return this.http.get<Order[]>(this.orderUrl)
      // .pipe( catchError(this.handleError))
        //.subscribe(response => console.log(response));
        return of (this.orderDetails);
      }

      getData() {
        let headers = this.createRequestHeader();
        return this.http.get(this.orderUrl, { headers: headers });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token",
            "Content-Type": "application/json",
         });

        return headers;
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
