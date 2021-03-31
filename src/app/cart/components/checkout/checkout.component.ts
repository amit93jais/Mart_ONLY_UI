import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";
import { Address } from "~/app/address/models/address";
import { AddressService } from "~/app/address/services/address.service";
import { StateService } from "~/app/shared/services/state.service";


@Component({
    selector: "Cart",
    templateUrl: "./checkout.component.html",
    styleUrls: ["./../cart.component.css"],
})
export class CheckoutComponent implements OnInit {

    address: Address;

    constructor(private addressService: AddressService, public stateService: StateService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
       // this.getDefaultAddress();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getDefaultAddress(){
        if(this.stateService.state.isLoggedIn){
        this.addressService.getDefaultAddress().subscribe(add => this.address = add);
        }
      }

    payment(){

    }

}
