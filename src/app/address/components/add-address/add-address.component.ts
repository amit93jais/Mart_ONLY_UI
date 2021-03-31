import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Router, ActivatedRoute } from "@angular/router";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { Address } from "../../models/address";
import { AddressService } from "../../services/address.service";

const addressMetadata = require('../../services/address-metadata.json');

@Component({
    selector: "AddAddress",
    moduleId: module.id,
    templateUrl: "./add-address.component.html",
    styleUrls: ["./../address.component.css"],
})
export class AddAddressComponent implements OnInit {
    address: Address;
    routeState: any;
    addressMetadata;

    @ViewChild('myValidationModesDataForm', { static: false }) myValidateDataFormComp: RadDataFormComponent;

    constructor( private _activatedRoute: ActivatedRoute, private router: Router,
        private addressService: AddressService ) {

       this.address = new Address(null, null, null, null, null, "Mirzapur", "231001", "Uttar Pradesh",
       null, null);

       this.addressMetadata = JSON.parse(JSON.stringify(addressMetadata));

        //The below code is used to get data from address component in case of edit address
        if (this.router.getCurrentNavigation().extras.state) {
            this.routeState = this.router.getCurrentNavigation().extras.state;
            if (this.routeState) {
                this.address = this.routeState.address;
            }
          }
    }

    ngOnInit(): void {

    }

    addOrUpdateAddress(){
        this.myValidateDataFormComp.dataForm.validateAll()
        .then(result => {
        this.updateTextWithResult(result);
        if(result === true){
            console.log("address id for update/create: "+this.address.id);
            if(this.address.id == null || this.address.id == undefined){
             this.addressService.addNewAddress(this.address)
             .subscribe(
                () => {
                    alert("Successfully added new address.");
                    this.router.navigate(["/address"]);
                }
            );
            }else{
                this.addressService.updateAddress(this.address)
                .subscribe(
                    () => {
                        alert("Successfully updated address.");
                        this.router.navigate(["/address"]);
                    }
                );
            }

        }
    });
    }

    public updateTextWithResult(validationResult) {
        this.myValidateDataFormComp.dataForm.commitAll();
   }


}
