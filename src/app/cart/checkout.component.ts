import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { CartService } from "../services/cart.service";
import { ProductQty } from "../model/productQty";
import { Router } from "@angular/router";
import { AddressService } from "../services/address.service";
import { Address } from "../model/address";

@Component({
    selector: "Cart",
    templateUrl: "./checkout.component.html",
    styleUrls: ["./cart.component.css"],
    providers: [AddressService]
})
export class CheckoutComponent implements OnInit {

    address: Address;

    constructor(private addressService: AddressService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.getDefaultAddress();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getDefaultAddress(){
        this.addressService.getDefaultAddress().subscribe(add => this.address = add);
      }

    payment(){

    }

}
