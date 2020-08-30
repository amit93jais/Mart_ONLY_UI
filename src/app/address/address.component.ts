import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";

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
    removeMsg = "Are you sure want to delete this address?\n\nPlease note: Deleting this "+
    "address will not delete any pending orders being shipped to this address.";

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

    removeAddress(){
        dialogs.confirm(this.removeMsg).then(result => {
            console.log("Dialog result: " + result);
        });
    }

    editAddress(address: Address){
       this._router.navigate(['/address/addAddress'], {
       state: {
            address: address
         }
       });
    }

    changeDefaultAddress(id){
      this.addressList.forEach((add) => {
            if(add.id == id){
            add.isDefault = true;
            }else{
                add.isDefault = false;
            }
        });
    }


}
