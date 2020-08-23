import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Router } from "@angular/router";
import { AddressService } from "../services/address.service";
import { Address } from "../model/address";

@Component({
    selector: "Address",
    moduleId: module.id,
    templateUrl: "./address.component.html",
    styleUrls: ["./address.component.css"],
    providers: [AddressService]
})
export class AddressComponent implements OnInit {
    addressList : Address[]= [];

    constructor(private addressService : AddressService, private _router: Router) {

    }

    ngOnInit(): void {
        this.getAllAddress();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getAllAddress(){
        this.addressService.getAllAddress().subscribe(addresses => this.addressList = addresses);
        console.log("***Address : "+this.addressList[0].fullName);
    }


}
