import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Router, ActivatedRoute } from "@angular/router";
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
    routeState: any;

    constructor( private _activatedRoute: ActivatedRoute, private router: Router,  private addressService: AddressService ) {
       this.address = new Address();

        //The below code is used to get data from address component.
        if (this.router.getCurrentNavigation().extras.state) {
            this.routeState = this.router.getCurrentNavigation().extras.state;
            if (this.routeState) {
                this.address = this.routeState.address;
              console.log("Address *********** "+this.address + " *** "+this.address.addressLine1);
            }
          }
    }

    ngOnInit(): void {

    }

    save(){
   console.log("Postal code on save:: "+this.address.postalCode);
    }


}
