import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Router, ActivatedRoute } from "@angular/router";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { Address } from "~/app/shared/models/address";
import { AddressService } from "~/app/shared/services/address.service";

const addressMetadata = require('../../services/address-metadata.json');

@Component({
    selector: "AddAddress",
    moduleId: module.id,
    templateUrl: "./add1-address.component.html",
    styleUrls: ["./../address.component.css"],
    providers: [AddressService]
})
export class AddAddressComponent implements OnInit {
    address: Address;
    routeState: any;
    addressMetadata;

    @ViewChild('myValidationModesDataForm', { static: false }) myValidateDataFormComp: RadDataFormComponent;

    constructor( private _activatedRoute: ActivatedRoute, private router: Router,  private addressService: AddressService ) {
       this.address = new Address(null, null, null, null, null, "Mirzapur", "231001", "Uttar Pradesh",
       null, null);
       this.addressMetadata = JSON.parse(JSON.stringify(addressMetadata));

        //The below code is used to get data from address component.
        if (this.router.getCurrentNavigation().extras.state) {
            this.routeState = this.router.getCurrentNavigation().extras.state;
            if (this.routeState) {
                this.address = this.routeState.address;
            }
          }
    }

    ngOnInit(): void {

    }

    save(){
        this.myValidateDataFormComp.dataForm.validateAll()
        .then(result => {
        this.updateTextWithResult(result);
        if(result === true){
            console.log("address serrvice called");
             /* this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                },
                (exception) => {
                    if (exception.error && exception.error.description) {
                        alert(exception.error.description);
                    } else {
                        alert(exception)
                    }
                }
            ); */
        }
    });
    }

    public updateTextWithResult(validationResult) {
        const validatedValue = "fullName: " + this.myValidateDataFormComp.dataForm.getPropertyByName("fullName").valueCandidate +
            " addressLine1: " + this.myValidateDataFormComp.dataForm.getPropertyByName("addressLine1").valueCandidate;

            console.log("Validated value: "+validatedValue);
            let result = validationResult;
            console.log("Validation result: "+result);
    }


}
