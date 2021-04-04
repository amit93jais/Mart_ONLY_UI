import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { CartLine } from '../models/cart-line';
import { environment } from '~/environments/environment';
import { StateService } from '~/app/shared/services/state.service';
import { Product } from '~/app/shared/models/product';
import { ProductCartQty } from '~/app/search/models/product-cart-qty';

@Injectable({
    providedIn: "root"
})
export class CartService {

    product1: Product = {id:1, name:'Potato', imageUrl:'~/images/products/potato.jpg', category:'', quantity:'1 kg', price:32};
    product2: Product = {id:2, name:'Lemon', imageUrl:'~/images/products/lemon.jpg', category:'', quantity:'250 g', price:25};
    product3: Product = {id:3, name:'Onion', imageUrl:'~/images/products/onion.jpg', category:'', quantity:'1 kg',price:40};
    product4: Product = {id:4, name:'Tomato', imageUrl:'~/images/products/tomato.jpg', category:'', quantity:'1 kg',price:60};

    productQty: ProductCartQty[] =[
        {product: this.product1, qtyInCart:1},
        {product: this.product3, qtyInCart:1},
        {product: this.product4, qtyInCart:1},
        {product: this.product4, qtyInCart:1},
        {product: this.product4, qtyInCart:1},
        {product: this.product3, qtyInCart:2},
        {product: this.product2, qtyInCart:2},
        {product: this.product1, qtyInCart:3}

    ]

    constructor(private http: HttpClient, private stateService: StateService) { }

    getCartLength(): Observable<number>{
        return this.http.get<number>(environment.api.cart.length,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString()
              },
        });
    }

    getItems(): Observable<CartLine[]> {
        return this.http.get<CartLine[]>(environment.api.cart.all,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString()
              },
        });
    }

    addToCart(productId, quantity): Observable<Boolean>{
        return this.http.get<Boolean>(environment.api.cart.addToCart,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString(),
                productId: productId,
                quantity: quantity
              },
        });
    }

    increaseQty(productId): Observable<Boolean>{
        return this.http.get<Boolean>(environment.api.cart.increase,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString(),
                productId: productId.toString()
              },
        });
    }

    decreaseQty(productId): Observable<Boolean>{
        return this.http.get<Boolean>(environment.api.cart.decrease,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString(),
                productId: productId.toString()
              },
        });
    }

    removeProduct(productId): Observable<Boolean>{
        return this.http.delete<Boolean>(environment.api.cart.remove,{
            params: {
                userId: this.stateService.state.loggedInUser$.value.id.toString(),
                productId: productId.toString()
              },
        });
    }


}
