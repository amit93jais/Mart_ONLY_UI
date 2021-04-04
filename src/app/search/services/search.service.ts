import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Product } from '~/app/shared/models/product';
import { environment } from '~/environments/environment';
import { StateService } from '~/app/shared/services/state.service';
import { ProductCartQty } from '../models/product-cart-qty';


@Injectable({
    providedIn: "root"
})
export class SearchService {
    product1: Product = {id:1, name:'Potato', imageUrl:'~/images/products/potato.jpg', category:'', quantity:'1 kg', price:32};
    product2: Product = {id:2, name:'Lemon', imageUrl:'~/images/products/lemon.jpg', category:'', quantity:'250 g', price:25};
    product3: Product = {id:3, name:'Onion', imageUrl:'~/images/products/onion.jpg', category:'', quantity:'1 kg',price:40};
    product4: Product = {id:4, name:'Tomato', imageUrl:'~/images/products/tomato.jpg', category:'', quantity:'1 kg',price:60};

    productQty: ProductCartQty[] =[
        {product: this.product1, qtyInCart:2},
        {product: this.product2, qtyInCart:0},
        {product: this.product3, qtyInCart:1},
        {product: this.product4, qtyInCart:1},

    ]

    constructor(private http: HttpClient, private stateService: StateService) { }

    getProductByKey(searchKey: string): Observable<ProductCartQty[]> {
        let userId = null;
        if(this.stateService.state.isLoggedIn){
            userId = this.stateService.state.loggedInUser$.value.id.toString()
        }
        return this.http.get<ProductCartQty[]>(environment.api.search + "/" + searchKey, {
            params: {
                userId: userId
            }
        });
    }

    getProductFromOrder(orderId: string): Observable<ProductCartQty[]> {
        return of (this.productQty);
      }

}
