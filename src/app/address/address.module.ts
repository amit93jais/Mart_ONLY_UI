import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AddressRoutingModule } from "./address-routing.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { AddAddressComponent } from "./components/add-address/add-address.component";
import { AddressComponent } from "./components/address.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,  //Neet to import this here to work ngModule
        NativeScriptUIDataFormModule, //---This is used for RadDataForm
        AddressRoutingModule
    ],
    declarations: [
        AddressComponent,
        AddAddressComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddressModule { }
