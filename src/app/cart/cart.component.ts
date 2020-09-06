import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { CartService } from "../services/cart.service";
import { ProductQty } from "../model/productQty";
import { Router } from "@angular/router";

@Component({
    selector: "Cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
    providers: [CartService]
})
export class CartComponent implements OnInit {

    cartList: ProductQty[] = [];

    constructor(private router:Router, private cartService: CartService) {
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

    increaseQty(productQty: ProductQty) {
        productQty.qtyInCart++;
     }

     decreaseQty(productQty: ProductQty) {
         productQty.qtyInCart--;
         if(productQty.qtyInCart == 0){
             this.deleteItem(productQty);
         }
     }

     deleteItem(productQty){
        const index: number = this.cartList.indexOf(productQty);
        if (index !== -1) {
            this.cartList.splice(index, 1);
        }
     }

     checkout(){
         console.log("checkout called");
         this.router.navigateByUrl("/cart/checkout");
     }
}
