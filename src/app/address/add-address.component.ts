import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Router } from "@angular/router";
import { AddressService } from "../services/address.service";
import { Address } from "../model/address";

@Component({
    selector: "AddAddress",
    moduleId: module.id,
    templateUrl: "./add-address.component.html",
    styleUrls: ["./address.component.css"],
    providers: [AddressService]
})
export class AddAddressComponent implements OnInit {
    address: Address;

    constructor() {
        this.address = new Address();
    }

    ngOnInit(): void {
    }

    save(){

    }


}
