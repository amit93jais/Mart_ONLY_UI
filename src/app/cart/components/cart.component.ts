import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";
import { CartService } from "../services/cart.service";
import { CartLine } from "../models/cart-line";
import { StateService } from "~/app/shared/services/state.service";


@Component({
    selector: "Cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
    providers: [CartService]
})
export class CartComponent implements OnInit {

    cartList: CartLine[] = [];

    constructor(private router:Router, private cartService: CartService,
        private stateService: StateService) {
        // Use the component constructor to inject providers.
    }


    ngOnInit(): void {
        this.getItemInCart();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getItemInCart(){
        this.cartService.getItems().subscribe(items => this.cartList = items);
    }

    increaseQty(cartLine: CartLine) {
        this.cartService.increaseQty(cartLine.productId)
         .subscribe((result) =>{
            if(result){
             cartLine.quantity++;
             this.stateService.state.cartLength = this.stateService.state.cartLength +1;
             }
        });
     }

    decreaseQty(cartLine: CartLine) {
        if(cartLine.quantity == 1){
            this.removeProductFromCart(cartLine);
        }else{
            this.cartService.decreaseQty(cartLine.productId)
            .subscribe((result) => {
              if(result){
                cartLine.quantity--;
                this.stateService.state.cartLength = this.stateService.state.cartLength - 1;
              }
            });
        }
    }

    removeProductFromCart(cartLine){
        this.cartService.removeProduct(cartLine.productId)
        .subscribe((result) =>{
            if(result){
                this.stateService.state.cartLength = this.stateService.state.cartLength - 1;
                const index: number = this.cartList.indexOf(cartLine);
                if (index !== -1) {
                    this.cartList.splice(index, 1);
                }
            }
        });

     }

     checkout(){
         console.log("checkout called");
         this.router.navigateByUrl("/cart/checkout");
     }
}
