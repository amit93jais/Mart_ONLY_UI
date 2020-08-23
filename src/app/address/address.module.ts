import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AddressRoutingModule } from "./address-routing.module";
import { AddressComponent } from "./address.component";
import { AddAddressComponent } from "./add-address.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
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
