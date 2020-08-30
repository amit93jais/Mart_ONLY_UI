import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { AddressService } from "../services/address.service";
import { Address } from "../model/address";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [AddressService]
})
export class HomeComponent implements OnInit {

    //protected images: any[] = [];
    cartLength: number = 3;
    address: Address;

    constructor(private addressService: AddressService) {
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

}
