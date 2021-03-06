import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";

import { Router } from "@angular/router";
import { Address } from "../models/address";
import { AddressService } from "../services/address.service";
import { StateService } from "~/app/shared/services/state.service";

@Component({
    selector: "Address",
    moduleId: module.id,
    templateUrl: "./address.component.html",
    styleUrls: ["./address.component.css"]
})
export class AddressComponent implements OnInit {
    removeMsg = "Are you sure want to delete this address?\n\nPlease note: Deleting this "+
    "address will not delete any pending orders being shipped to this address.";

    addressList : Address[]= [];


    constructor(private addressService : AddressService, private _router: Router,
        public stateService: StateService) {
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
    }

    removeAddress(addressId){
        dialogs.confirm(this.removeMsg).then(result => {
            //if ok click
            console.log("result: "+result);
            if(result){
                console.log("result1: "+result);
              this.addressService.removeAddress(addressId)
              .subscribe(
                () => {
                    this.getAllAddress();
                }
              );
            }
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
        console.log("AddressId: "+id);
       this.addressService.changeDefaultAddress(id)
       .subscribe(
        () => {
            this.addressList.forEach((add) => {
                if(add.id == id){
                add.isDefault = true;
                }else{
                    add.isDefault = false;
                }
            });
            //this.getAllAddress();
        }
      );
    }


}
