import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../config/environment';
import { Observable, throwError, of } from 'rxjs';
import { Product } from '../model/product';
import { ProductQty } from '../model/productQty';

@Injectable()
export class CartService {

    product1: Product = {id:1, name:'Potato', imageUrl:'~/images/products/potato.jpg', category:'', weight:'1 kg', price:32};
    product2: Product = {id:2, name:'Lemon', imageUrl:'~/images/products/lemon.jpg', category:'', weight:'250 g', price:25};
    product3: Product = {id:3, name:'Onion', imageUrl:'~/images/products/onion.jpg', category:'', weight:'1 kg',price:40};
    product4: Product = {id:4, name:'Tomato', imageUrl:'~/images/products/tomato.jpg', category:'', weight:'1 kg',price:60};

    productQty: ProductQty[] =[
        {product: this.product1, quantity:1},
        {product: this.product2, quantity:1},
        {product: this.product3, quantity:1},
        {product: this.product4, quantity:2},

    ]

    constructor(private http: HttpClient) { }

    getItems(): Observable<ProductQty[]> {
        return of (this.productQty);
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